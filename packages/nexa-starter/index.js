import { launchNexa } from 'nexa-core';
import { AuthMiddleware } from './app/auth.js';

const STATIC_API_TOKEN = '123456';

launchNexa((app) => {
    AuthMiddleware(app, STATIC_API_TOKEN);
})