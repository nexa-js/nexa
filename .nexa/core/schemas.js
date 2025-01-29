const fs = require('fs');
const path = require('path');
const { NexaLogger } = require('./logger');

const routesFolder = path.join(__dirname, '../../schemas');


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

const makeSchema = (name, options) => {
    if (NexaSchemas[name]) {
        return NexaLogger.error(`Schema with name "${name}" already exists`);
    }

    NexaLogger.info(`Schema created: ${name}`);

    NexaSchemas[name] = options;

    return NexaSchemas[name];
}

module.exports = {
    makeNexaSchemas: (app) => {
        global.nexa = makeSchema;
        return generateSchemas(app, routesFolder);
    },
    NexaSchemas,
}
