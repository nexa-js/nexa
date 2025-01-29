const { NexaLogger } = require('./logger');
const { zodMock } = require('@anatine/zod-mock');

const UnifiedResponse = async (req, res, schemas, handler, options) => {
    NexaLogger.info(`Route executed: [${req.method}] ${req.originalUrl}`);

    let errors = null;

    if (!Array.isArray(schemas)) {
        schemas = [schemas, null];
    }

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

    let data = await handler(req, res)

    if (responseSchema?.body) {
        const parsedResponse = responseSchema?.safeParse(data);
        if (!parsedResponse.success) {
            errors = parsedResponse.error.format();
            return res.json({ status: 500, message: "Response validation failed", data: null, errors });
        }
    }
    const mockSchema = responseSchema?.response ?? requestSchema?.response
    data = data ?? zodMock(mockSchema);

    return res.json({
        status: 200,
        message: '',
        data: data,
        errors,
    });
};

module.exports = {
    UnifiedResponse,
};
