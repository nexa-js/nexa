import { NexaRoutes } from './routes.js';
import request from 'supertest';
import Mocha from 'mocha';
import { strict as assert } from 'assert';

const mocha = new Mocha();

const testRoute = (route) => {
    if (!route.options) {
        route.options = {};
    }

    if (!route.options.tests) {
        return;
    }

    let testIndex = 1;
    
    for (const test of route.options.tests) {
        mocha.suite.addTest(new Mocha.Test(`Testing route: [${route.method}] ${route.path}, Test #${testIndex++}`, async () => {
            assert.equal(2 + 2, 4);
            if (typeof test.setup === 'function') {
                await test.setup();
            }

            const queryString = new URLSearchParams(test.query).toString();
            const req = request(nexa.app)[route.method](`${route.path}?${queryString}`);

            if (test.body) {
                req.send(test.body);
            }

            const [response] = await Promise.all([req]);

            assert.strictEqual(response.body.errors, undefined, JSON.stringify(response.body.errors));
            assert.equal(response.statusCode, 200);
        }));
    }
}

export const runTests = async () => {
    nexa.logger.info('Running tests...');

    NexaRoutes.forEach((route) => {
        testRoute(route);
    });

    // Run tests
    mocha.run(failures => {
        console.log(failures ? 'Some tests failed' : 'All tests passed');
    });
}
