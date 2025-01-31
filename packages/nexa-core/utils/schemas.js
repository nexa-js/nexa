import { NexaSchemas } from '../core/schemas.js';
import { NexaLogger } from '../core/logger.js';

export const findSchema = (schema) => {
    if(typeof schema != 'string') {
        return schema
    }

    if (NexaSchemas[schema]) {
        return NexaSchemas[schema];
    }

    return NexaLogger.error(`Schema with name "${schema}" doesn't exists`);
}
