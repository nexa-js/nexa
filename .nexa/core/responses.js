const { NexaLogger } = require('./logger');
const { generateMock } = require('@anatine/zod-mock');
const { findSchema } = require('../utils/schemas');

const UnifiedResponse = async (req, res, schemas, handler, options) => {
    NexaLogger.info(`Route executed: [${req.method}] ${req.originalUrl}`);

    let errors = undefined;

    if (!Array.isArray(schemas)) {
        schemas = [schemas, null];
    }

    const requestSchema = findSchema(schemas?.[0]);
    const responseSchema = findSchema(schemas?.[1]) || findSchema(schemas?.[0]);

    if (requestSchema?.query) {
        const parsedQuery = requestSchema.query.safeParse(req.query);
        if (!parsedQuery.success) {
            errors = parsedQuery.error.format();
            return res.json({ status: 400, message: 'Invalid query parameters', errors });
        }
    }

    if (requestSchema?.body) {
        const parsedBody = requestSchema.body.safeParse(req.body);
        if (!parsedBody.success) {
            errors = parsedBody.error.format();
            return res.json({ status: 400, message: 'Invalid request body', errors });
        }
    }

    let data = await handler(req, res)

    if (responseSchema?.body) {
        const parsedResponse = responseSchema?.safeParse(data);
        if (!parsedResponse.success) {
            errors = parsedResponse.error.format();
            return res.json({ status: 500, message: "Response validation failed", errors });
        }
    }

    data = data ?? generateMock(responseSchema.response, {
        recordKeysLength: 10
    });

    return res.json({
        status: 200,
        data,
        errors,
    });
};

module.exports = {
    UnifiedResponse,
};
