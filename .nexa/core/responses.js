const { NexaLogger } = require('./logger');
const { zodMock } = require('@anatine/zod-mock');

const UnifiedResponse = async (req, res, schemas, handler, options) => {
    NexaLogger.info(`Route executed: [${req.method}] ${req.originalUrl}`);

    let errors = null;

    const requestSchema = schemas?.[0];
    const responseSchema = schemas?.[1];

    if (requestSchema?.query) {
        const parsedQuery = requestSchema.query.safeParse(req.query);
        if (!parsedQuery.success) {
            errors = parsedQuery.error.format();
            return res.json({ status: 400, message: 'Invalid query parameters', data: null, errors });
        }
    }

    if (requestSchema?.body) {
        const parsedBody = requestSchema.body.safeParse(req.body);
        if (!parsedBody.success) {
            errors = parsedBody.error.format();
            return res.json({ status: 400, message: 'Invalid request body', data: null, errors });
        }
    }

    const data = await handler(req, res);

    const finalResponse = data !== undefined ? data : zodMock(responseSchema);

    if (responseSchema) {
        const parsedResponse = responseSchema.safeParse(finalResponse);
        if (!parsedResponse.success) {
            errors = parsedResponse.error.format();
            return res.json({ status: 500, message: "Response validation failed", data: null, errors });
        }
    }

    return res.json({
        status: 200,
        message: '',
        data: finalResponse,
        errors,
    });
};

module.exports = {
    UnifiedResponse,
};
