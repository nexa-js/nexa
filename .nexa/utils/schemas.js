const { NexaSchemas } = require('../core/schemas');
const { NexaLogger } = require('../core/logger');

const findSchema = (schema) => {
    if(typeof schema != 'string') {
        return schema
    }

    if (NexaSchemas[schema]) {
        return NexaSchemas[schema];
    }

    return NexaLogger.error(`Schema with name "${schema}" doesn't exists`);
}

module.exports = {
    findSchema,
}