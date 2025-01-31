import env from './utils/env.js'
import express from 'express'
const app = express()

const port = env.NEXA_PORT;

import { makeNexaRoutes } from './core/routes.js';
import { makeNexaSchemas } from './core/schemas.js';
import { registerNexaHelpers } from './core/helpers.js';

const start = async () => {
  registerNexaHelpers(app);

  app.listen(port, () => {
    nexa.logger.info(`Nexa listening on port ${port}`)
  })

  await makeNexaSchemas(app);
  await makeNexaRoutes(app);
}

// const { middlewares } = require('../src/nexa');

// if (middlewares) {
//   middlewares(app);
// }

export const launchNexa = async (callback) => {
  await start();

  if (callback) {
    callback(app);
  }

  return app;
}
