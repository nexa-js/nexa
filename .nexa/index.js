const env = require('./utils/env')
const express = require('express')
const app = express()

const port = env.NEXA_PORT;
const { makeNexaRoutes } = require('./core/routes');
const { makeNexaSchemas } = require('./core/schemas');
const { NexaLogger } = require('./core/logger');

app.listen(port, () => {
  NexaLogger.info(`Nexa listening on port ${port}`)
})

makeNexaSchemas(app);
makeNexaRoutes(app);