import fs from 'fs';
import path from 'path';
import { UnifiedResponse } from './responses.js';
import { NexaLogger } from './logger.js';
import { NEXA_MAIN_LOCATION } from '../utils/env.js';

const routesFolder = path.join(NEXA_MAIN_LOCATION, '../routes');

// Function to convert the file path to a route path
const convertToRoutePath = (filePath) => {
    let routePath = filePath.replace(routesFolder, '').replace(/\.js$/, '');

    // Replace dynamic Next.js routes (e.g., [slug].js) with Express parameters (e.g., :slug)
    routePath = routePath.replace(/\[(.*?)\]/g, ':$1');

    // Add leading slash for routes
    if (routePath === '') {
        return '/';  // Home route
    }

    return routePath;
};

export let NexaRoutes = [];

// Function to read the routes and generate Express routes
const generateRoutes = async (directory) => {
    if (!fs.existsSync(directory)) {
        return NexaLogger.error(`Directory "${directory}" does not exist`);
    }

    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);
        // If it's a directory, recursively generate routes for files in it
        if (stat.isDirectory()) {
            await generateRoutes(fullPath);
        } else if (file.endsWith('.js')) {
            const routePath = convertToRoutePath(fullPath);
            
            nexa.makeRoute = (method, schemas, handler, options) => {
                NexaLogger.info(`Route created: [${method}] ${routePath}`);

                NexaRoutes.push({
                    method: method.toLowerCase(),
                    path: routePath,
                    schemas,
                    handler,
                    options,
                });

                nexaApp[method.toLowerCase()](routePath, async (req, res) => {
                    NexaLogger.debug(`Request received: [${req.method}] ${req.originalUrl}`);
                    await UnifiedResponse(req, res, schemas, handler, options);
                });
            }

            await import(fullPath);
        }
    };
};

export const makeNexaRoutes = async () => {
    return await generateRoutes(routesFolder);
}
