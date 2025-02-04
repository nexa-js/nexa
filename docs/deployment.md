# Deployment & Production Setup

## Running Nexa in Production

Running Nexa in production requires some adjustments to ensure performance, reliability, and security. Here are the key steps to set up Nexa for production:

1. **Environment Variables:** Ensure sensitive information like API keys, database credentials, and environment-specific configurations are stored in environment variables.
2. **Optimize Performance:** You may want to enable caching, compression, and other optimizations for production environments.
3. **Error Handling:** Set up proper error handling and logging to capture errors and monitor your app.
4. **Logging:** Use logging tools like Winston to capture logs and track requests and errors in production.

For example, to launch Nexa in production mode, you can configure `NEXA_DEV_MODE` and use production-specific settings:
```bash
NEXA_DEV_MODE=false
```

This ensures that Nexa is running in production mode, and you can adjust settings accordingly.

## Environment Variables

Environment variables are critical for handling configuration settings that differ between development, staging, and production environments. These variables store sensitive data and configuration that shouldn’t be hardcoded into your application.

To manage environment variables, create a `.env` file in your project’s root directory and add variables like:

```
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
JWT_SECRET=your-jwt-secret
```

To access these variables in your code, use a package like `dotenv`:

```javascript
import dotenv from 'dotenv';
import { launchNexa } from '@nexa-js/nexa-core';

dotenv.config();

const dbHost = process.env.DB_HOST;

launchNexa((app) => {
    // ...
});
```

This ensures sensitive information is not exposed in the codebase and can be changed easily based on the environment.

## Security Best Practices

Security is critical in production environments. Here are some best practices for securing your Nexa app:

### 1. **Use HTTPS**

Ensure all your production traffic is encrypted by serving your app over HTTPS. You can set up HTTPS using a reverse proxy like Nginx or configure it directly with your Node.js server.

### 2. **Rate Limiting**

Use rate limiting to protect your app from denial-of-service attacks and to prevent abuse of your API. Packages like `express-rate-limit` can help implement this:

### 3. **Use a Strong JWT Secret**
When using JWT for authentication, ensure you have a strong and unique secret key. Store it securely in environment variables.

### 4. **Set HTTP Headers Securely**

Use `helmet` to set secure HTTP headers that protect your app from common web vulnerabilities:

### 5. **Data Encryption**

For any sensitive data that needs to be stored (like passwords or personal information), always encrypt it using a secure hashing algorithm (e.g., bcrypt for passwords).

### 6. **Logging & Monitoring**

Set up proper monitoring tools to detect and respond to issues quickly.


## Summary

When deploying Nexa in production, make sure to:
- Set up **environment variables** for sensitive data and configurations.
- Ensure **security best practices**, like using HTTPS, sanitizing inputs, and implementing rate limiting.

These steps will help you ensure your Nexa app runs securely, efficiently, and reliably in a production environment.

💡 Next Step: Explore [Contribution Guide](/contribution)! 🚀