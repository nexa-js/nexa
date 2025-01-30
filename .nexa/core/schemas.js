const fs = require('fs');
const path = require('path');
const { NexaLogger } = require('./logger');
const { query } = require('express');
const { generateMock } = require('@anatine/zod-mock');
const { z } = require('zod');
const crypto = require('crypto');

const routesFolder = path.join(__dirname, '../../conf/schemas');


// Function to read the routes and generate Express routes
const generateSchemas = (app, directory) => {
    if (!fs.existsSync(directory)) {
        return NexaLogger.error(`Directory "${directory}" does not exist`);
    }

    const files = fs.readdirSync(directory);

    files.forEach((file) => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);
        // If it's a directory, recursively generate routes for files in it
        if (stat.isDirectory()) {
            generateSchemas(app, fullPath);
        } else if (file.endsWith('.js')) {
            require(fullPath);
        }
    });
};

let NexaSchemas = {};

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
    if (schema?.query) {
        const parsedQuery = schema.query.safeParse(req.query);
        if (!parsedQuery.success) {
            errors = parsedQuery.error;
            return res.json({ status: 400, message: 'Invalid query parameters', errors });
        }
    }

    if (schema?.body) {
        const parsedBody = schema.body.safeParse(req.body);
        if (!parsedBody.success) {
            errors = parsedBody.error;
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
            errors = parsedResponse.error;
            return res.json({ status: 500, message: "Response validation failed", errors });
        }
    }
}


const schemaMockHandler = async (schema, req, res, data) => {
    let recordKeysLength = 1;
    let mapArrayItemsLength = 1;
    let page = 1;

    if (schema.pagination) {
        perPage = req.query.perPage || 1;
        page = req.query.page || 1;

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
            throw new Error(`page must be greater than 0`);
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

const makeSchema = (name, options) => {
    if (NexaSchemas[name]) {
        return NexaLogger.error(`Schema with name "${name}" already exists`);
    }

    NexaLogger.info(`Schema created: ${name}`);

    // Default schema options
    NexaSchemas[name] = {
        static: true,
        pagination: false,
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

module.exports = {
    makeSchema,
    makeNexaSchemas: (app) => {
        return generateSchemas(app, routesFolder);
    },
    NexaSchemas,
}
