import { makeSchema } from './schemas.js';
import { NexaLogger } from './logger.js';
import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export const registerNexaHelpers = (app) => {
    global.z = z;
    global.nexaApp = app;
    global.nexa = {
        app: app,
        logger: NexaLogger,
        schema: makeSchema,
        makeRoute: (method, routePath, schemas, handler, options) => {
            throw new Error('nexa.makeRoute is not implemented');
        },
        get: (schemas, handler, options) => {
            nexa.makeRoute('GET', schemas, handler, options);
        },
        post: (schemas, handler, options) => {
            nexa.makeRoute('POST', schemas, handler, options);
        },
        put: (schemas, handler, options) => {
            nexa.makeRoute('PUT', schemas, handler, options);
        },
        delete: (schemas, handler, options) => {
            nexa.makeRoute('DELETE', schemas, handler, options);
        },
        patch: (schemas, handler, options) => {
            nexa.makeRoute('PATCH', schemas, handler, options);
        },
    }
}
