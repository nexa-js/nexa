import env from './utils/env.js'
import { app, httpServer } from './core/express.js';

const port = env.NEXA_PORT;

import { makeNexaRoutes } from './core/routes.js';
import { makeNexaSchemas } from './core/schemas.js';
import { makeSwagger } from './core/docs.js';
import { registerNexaHelpers } from './core/helpers.js';
import { runTests } from './core/tests.js';
import { makeNexaGraphQL } from './core/graphql/index.js';

const runApplication = async () => {
  registerNexaHelpers(app);
  await makeNexaSchemas(app);
  await makeNexaRoutes(app);

  if (env.NEXA_DOCS) {
    await makeSwagger(app);
  }
}

export const launchNexa = async (callback) => {

  const isTesting = process.argv.includes('--test');

  await runApplication();

  if (isTesting) {
    await runTests();
  } else {
    await makeNexaGraphQL(app);
    await new Promise((resolve) => httpServer.listen({ port, }, resolve));
    console.log(`🚀 Nexa ready at http://localhost:${port}`);
  }

  if (callback) {
    callback(app);
  }

  return app;
}
