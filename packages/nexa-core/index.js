import env from './utils/env.js'
import express from 'express'
const app = express()

const port = env.NEXA_PORT;

import { makeNexaRoutes } from './core/routes.js';
import { makeNexaSchemas } from './core/schemas.js';
import { registerNexaHelpers } from './core/helpers.js';

const start = () => {
  registerNexaHelpers(app);

  app.listen(port, () => {
    nexa.logger.info(`Nexa listening on port ${port}`)
  })

  makeNexaSchemas(app);
  makeNexaRoutes(app);
}

// const { middlewares } = require('../src/nexa');

// if (middlewares) {
//   middlewares(app);
// }

export const launchNexa = async (callback) => {
  start();

  if (callback) {
    callback(app);
  }

  return app;
}
