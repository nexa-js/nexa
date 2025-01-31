import { NexaLogger } from './logger.js';
import { findSchema } from '../utils/schemas.js';
import http from 'http';

export const UnifiedResponse = async (req, res, schemas, handler, options) => {
    NexaLogger.debug(`Route executed: [${req.method}] ${req.originalUrl}`);

    let errors = undefined;

    if (!Array.isArray(schemas)) {
        schemas = [schemas, null];
    }

    const requestSchema = findSchema(schemas?.[0]);
    const responseSchema = findSchema(schemas?.[1]) || findSchema(schemas?.[0]);
    
    const input = await requestSchema._inputHandler(req, res);

    if(input) {
        return input;
    }

    let data = handler ? await handler(req, res) : undefined;

    const output = await responseSchema._outputHandler(req, res, data);

    if(output) {
        return output;
    }  

    const mockOutput = await requestSchema._mockHandler(req, res, data);

    if(mockOutput instanceof http.ServerResponse) {
        return mockOutput;
    } else {
        data = mockOutput;
    }

    return res.json({
        status: 200,
        data,
        errors,
    });
};