const fs = require('fs');
const path = require('path');
const { UnifiedResponse } = require('./responses');
const { NexaLogger } = require('./logger');

const routesFolder = path.join(__dirname, '../../conf/routes');

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

// Function to read the routes and generate Express routes
const generateRoutes = (directory) => {
    if (!fs.existsSync(directory)) {
        return NexaLogger.error(`Directory "${directory}" does not exist`);
    }
    
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);
        // If it's a directory, recursively generate routes for files in it
        if (stat.isDirectory()) {
            generateRoutes(fullPath);
        } else if (file.endsWith('.js')) {
            const routePath = convertToRoutePath(fullPath);
            
            nexa.makeRoute = (method, schemas, handler, options) => {
                NexaLogger.info(`Route created: [${method}] ${routePath}`);
                nexaApp[method.toLowerCase()](routePath, async (req, res) => {
                    NexaLogger.info(`Request received: [${req.method}] ${req.originalUrl}`);
                    await UnifiedResponse(req, res, schemas, handler, options);
                });
            }

            require(fullPath);
        }
    });
};

module.exports = {
    makeNexaRoutes: () => {
        return generateRoutes(routesFolder);
    },
}
