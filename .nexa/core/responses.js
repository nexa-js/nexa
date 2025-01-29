const { NexaLogger } = require('./logger');


const UnifiedResponse = (req, res, schemas, handler, options) => {
    NexaLogger.info(`Route executed: [${req.method}] ${req.originalUrl}`);

    let errors = null
    const data = handler(req, res);

    return res.json({
        status: 200,
        message: '',
        data,
        errors,
    });
}

module.exports = {
    UnifiedResponse,
}