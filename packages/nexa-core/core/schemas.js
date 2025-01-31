import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { generateMock } from '@anatine/zod-mock';
import { z } from 'zod';

import { NexaLogger } from './logger.js';
import { NEXA_MAIN_LOCATION } from '../utils/env.js';

const routesFolder = path.join(NEXA_MAIN_LOCATION, '../schemas');

// Function to read the routes and generate Express routes
const generateSchemas = async (app, directory) => {
    if (!fs.existsSync(directory)) {
        return NexaLogger.error(`Directory "${directory}" does not exist`);
    }

    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);
        // If it's a directory, recursively generate routes for files in it
        if (stat.isDirectory()) {
            await generateSchemas(app, fullPath);
        } else if (file.endsWith('.js')) {
            await import(fullPath);
        }
    };
};

export let NexaSchemas = {};

/**
 * Generates a deterministic seed from request query and body.
 * @param {Object} query - The URL query parameters.
 * @param {Object} body - The request body.
 * @returns {number} Numeric seed for faker.
 */
const generateFakerSeed = (query = {}, body = {}) => {
    // Normalize and stringify query parameters
    const sortedQuery = Object.entries(query)
        .filter(([key, value]) => value !== 'perPage')
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

    // Normalize and stringify request body
    const sortedBody = JSON.stringify(
        Object.keys(body)
            .sort()
            .reduce((acc, key) => ({ ...acc, [key]: body[key] }), {})
    );

    // Concatenate query and body
    const combinedString = `${sortedQuery}|${sortedBody}`;

    // Generate a SHA-256 hash
    const hash = crypto.createHash("sha256").update(combinedString).digest("hex");

    // Convert a portion of the hash to a numeric seed
    return parseInt(hash.substring(0, 10), 16) % 1000000; // Keep it within a reasonable range
};


const schemaInputHandler = async (schema, req, res) => {
    if (schema?.params) {
        const parsedQuery = schema.params.safeParse(req.params);
        if (!parsedQuery.success) {
            const errors = parsedQuery.error;
            return res.json({ status: 400, message: 'Invalid query parameters', errors });
        }
    }
    
    if (schema?.query) {
        const parsedQuery = schema.query.safeParse(req.query);
        if (!parsedQuery.success) {
            const errors = parsedQuery.error;
            return res.json({ status: 400, message: 'Invalid query parameters', errors });
        }
    }

    if (schema?.body) {
        const parsedBody = schema.body.safeParse(req.body);
        if (!parsedBody.success) {
            const errors = parsedBody.error;
            return res.json({ status: 400, message: 'Invalid request body', errors });
        }
    }
}

const schemaOutputHandler = async (schema, req, res, data) => {
    if (data === undefined) {
        return;
    }

    if (schema?.response) {
        const parsedResponse = schema.response.safeParse(data);
        if (!parsedResponse.success) {
            const errors = parsedResponse.error;
            return res.json({ status: 500, message: "Response validation failed", errors });
        }
    }
}


const schemaMockHandler = async (schema, req, res, data) => {
    let recordKeysLength = 1;
    let mapArrayItemsLength = 1;
    let page = 1;
    let perPage = 1;

    if (schema.pagination) {
        if(!req.query.perPage) {
            return res.json({ status: 500, message: `PerPage query param is missing` }); 
        }

        if(!req.query.page) {
            return res.json({ status: 500, message: `Page query param is missing` }); 
        }

        perPage = req.query.perPage;
        page = req.query.page;

        if (schema.pagination.perPageOptions && !schema.pagination.perPageOptions.includes(perPage)) {
            const includesValue = schema.pagination.perPageOptions
                .map(item => String(item).toLowerCase())
                .includes(String(perPage).toLowerCase());

            if (!includesValue) {
                return res.json({
                    status: 400, message: 'Invalid query parameters', errors: [{
                        message: `perPage must be one of ${schema.pagination.perPageOptions.join(', ')}`,
                    }]
                });
            }
        }

        if (page < 1) {
            return res.json({ status: 500, message: `Page query param must be greater than 0` }); 
        }

        recordKeysLength = perPage;
        mapArrayItemsLength = perPage;
    }

    const mockingSchema = schema.response instanceof z.ZodArray ? schema.response.length(perPage) : schema.response;

    let seed = generateFakerSeed(req.query, req.body);
    let options = {}
    if (schema.static) {
        options = {
            get seed() {
                return seed++;
            },
        }
    }

    return data ?? generateMock(mockingSchema, options);
}

export const makeSchema = (name, options) => {
    if (NexaSchemas[name]) {
        return NexaLogger.error(`Schema with name "${name}" already exists`);
    }

    NexaLogger.info(`Schema created: ${name}`);

    // Default schema options
    NexaSchemas[name] = {
        static: true, // Bind mocks to input query set
        pagination: false,
        params: null,
        query: null,
        body: null,
        response: null,
        ...options,
    };

    NexaSchemas[name]._inputHandler = (...args) => schemaInputHandler(NexaSchemas[name], ...args);
    NexaSchemas[name]._outputHandler = (...args) => schemaOutputHandler(NexaSchemas[name], ...args);
    NexaSchemas[name]._mockHandler = (...args) => schemaMockHandler(NexaSchemas[name], ...args);

    return NexaSchemas[name];
}

export const makeNexaSchemas = async (app) => {
    return await generateSchemas(app, routesFolder);
}