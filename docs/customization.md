# Middleware & Customization

## Adding Express Middleware

Nexa allows you to add custom Express middleware to modify the behavior of your API routes. This can be used for various purposes such as logging, authentication, validation, and more.

You can add middleware by modifying the Express app during the `launchNexa` function in `index.js` - app entrypoint.

**For example:**

```javascript
import { launchNexa } from '@nexa-js/nexa-core'; import express from 'express';

launchNexa((app) => { // Add custom Express middleware here
    app.use((req, res, next) => {
        console.log('Custom middleware is running!');
        next();
    });
});
```


In this example, we added a simple logging middleware that logs every request.

## Authentication & Authorization

Adding authentication and authorization to your routes is a common requirement for many APIs. Nexa makes it easy to integrate any authentication strategy, such as JWT, API keys, OAuth, etc.

You can add authentication middleware to protect routes or the entire API. Here's an example using a simple JWT authentication middleware:

```javascript
import { launchNexa } from '@nexa-js/nexa-core';
import express from 'express';

const jwtMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
        if (!token) {
        return res.status(403).json({ error: 'Authorization token is required' });
    }

    // Simple token validation (replace with actual JWT validation)
    if (token !== 'your-valid-token') {
        return res.status(401).json({ error: 'Invalid token' });
    }

    next(); // proceed to the next middleware or route handler
};

launchNexa((app) => {
    app.use(jwtMiddleware); // Apply JWT middleware to all routes
});
```

In this example, the `jwtMiddleware` checks for the `Authorization` header and validates the token before allowing access to the routes.

## CORS Configuration

Cross-Origin Resource Sharing (CORS) is a mechanism that allows your API to be accessed from different domains. Nexa supports CORS configuration, allowing you to specify which origins are allowed to access your API.

You can configure CORS in the `launchNexa` function like this:

```javascript
import { launchNexa } from '@nexa-js/nexa-core';
import cors from 'cors';

launchNexa((app) => {
    // Enable CORS for all origins
    app.use(cors());
    // Or specify allowed origins
    app.use(cors({
        origin: ['https://your-frontend-domain.com', 'https://another-domain.com'],
    }));
});
```

This will enable CORS for your API and allow access from the specified origins.

## Logging & Debugging with Winston

Nexa integrates well with `Winston`, a popular logging library. Using `Winston`, you can easily add logging and debugging capabilities to your API.

Here’s an example of how to integrate Winston for logging:

```javascript
nexa.logging.info('Message...')
nexa.logging.debug('Message...')
nexa.logging.error('Message...')
```

## Summary

Nexa allows for flexible middleware and customization. You can:
- Add Express middleware to modify the behavior of your API routes.
- Implement authentication and authorization strategies, such as JWT.
- Configure CORS to allow access from specific origins.

This flexibility helps you tailor your API to your specific needs and provides the tools necessary for secure, reliable, and easy-to-debug APIs.

💡 Next Step: Explore [Auto-Generated Documentation](/swagger)! 🚀