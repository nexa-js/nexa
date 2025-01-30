const env = require('./utils/env')
const express = require('express')
const app = express()

const port = env.NEXA_PORT;

const { makeNexaRoutes } = require('./core/routes');
const { makeNexaSchemas } = require('./core/schemas');
const { registerNexaHelpers } = require('./core/helpers');

registerNexaHelpers(app);

app.listen(port, () => {
  nexa.logger.info(`Nexa listening on port ${port}`)
})

makeNexaSchemas(app);
makeNexaRoutes(app);

const { middlewares } = require('../conf/nexa');

if (middlewares) {
  middlewares(app);
}