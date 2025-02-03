import { createDocument } from 'zod-openapi';

import { NexaRoutes } from './routes.js';
import swaggerUi from 'swagger-ui-express';
import { findSchema } from '../utils/schemas.js';

export const generateOpenApi = () => {
    let paths = {}

    const createRouteDocs = ({ path, method, schemas, handler, options }) => {
        if (!Array.isArray(schemas)) {
            schemas = [schemas, null];
        }

        const requestSchema = findSchema(schemas?.[0]);
        const responseSchema = findSchema(schemas?.[1]) || findSchema(schemas?.[0]);

        const { query, params, body } = requestSchema;
        const { response, pagination } = responseSchema;

        let config = {};

        if (params) {
            if(!config.requestParams) {
                config.requestParams = {};
            }
            config.requestParams.path = params;
        }

        if (query) {
            if(!config.requestParams) {
                config.requestParams = {};
            }
            
            config.requestParams.query = query;
        }

        if(pagination) {
            if(!config.requestParams) {
                config.requestParams = {};
            }

            const page = z.number().openapi({ example: 1 });
            const limit = z.enum(pagination.limits);
            
            if(config.requestParams.query) {
                config.requestParams.query = config.requestParams.query.extend({
                    page,
                    limit,
                })
            } else {
                config.requestParams.query = z.object({
                    page,
                    limit,
                });
            }
        }

        if (body) {
            config.requestBody = {
                content: {
                    'application/json': { schema: body },
                },
            }
        }

        if (response) {
            config.responses = {
                '200': {
                    description: '200 OK',
                    content: {
                        'application/json': { schema: response },
                    },
                },
            }
        }

        return config
    }

    NexaRoutes.reduce((acc, { path, method, schemas, handler, options }) => {
        if (!acc[path]) {
            acc[path] = {};
        }
        acc[path][method] = { schemas, handler, options };

        if (!paths[path]) {
            paths[path] = {};
        }

        paths[path][method] = createRouteDocs({ path, method, schemas, handler, options });

        return acc;
    }, {});

    return createDocument({
        openapi: '3.1.0',
        info: {
            title: 'Nexa API',
            version: '1.0.0',
        },
        paths,
    });
}

export const makeSwagger = async (app) => {
    nexa.logger.info('Swagger enabled at /api-docs');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(
        generateOpenApi()
    ));
}