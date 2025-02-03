import env from './utils/env.js'
import express from 'express'
const app = express()

const port = env.NEXA_PORT;

import { makeNexaRoutes } from './core/routes.js';
import { makeNexaSchemas } from './core/schemas.js';
import { registerNexaHelpers } from './core/helpers.js';
import { runTests } from './core/tests.js';

const runApplication = async () => {
  registerNexaHelpers(app);

  await makeNexaSchemas(app);
  await makeNexaRoutes(app);
}

export const launchNexa = async (callback) => {
  const isTesting = process.argv.includes('--test');

  await runApplication();

  if (isTesting) {
    await runTests();
  } else {
    app.listen(port, () => {
      nexa.logger.info(`Nexa listening on port ${port}`)
    })
  }

  if (callback) {
    callback(app);
  }

  return app;
}
