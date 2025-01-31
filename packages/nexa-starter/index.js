import { launchNexa } from '@nexa-js/nexa-core';
import { AuthMiddleware } from './app/auth.js';

const STATIC_API_TOKEN = 'auth_token_example';

launchNexa((app) => {
    AuthMiddleware(app, STATIC_API_TOKEN);
})