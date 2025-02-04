# Auto-Generated Documentation

## Using Swagger with Nexa

Nexa comes with built-in support for generating API documentation using Swagger. Swagger makes it easier to understand and interact with your API. Nexa automatically generates the documentation based on your route definitions and schemas.

The Swagger documentation will include:
- All your API endpoints.
- The request parameters.
- The response format.

Swagger is enabled by default in your Nexa project. Accessible on `/api-docs`

## OpenAPI Specification Explained

OpenAPI is a specification for describing and documenting APIs. It allows both humans and machines to understand the structure of your API, including the available endpoints, request parameters, and response formats.

Nexa automatically generates the OpenAPI specification using the schemas defined in your project. This includes:
- **Paths:** The available API routes.
- **Parameters:** The query, body, and path parameters for each route.
- **Responses:** The expected response data structure.

The OpenAPI specification will be automatically created based on your route definitions and the Zod schemas you use for validation.

## Request Parameters (query, body, params)

Nexa generates API documentation that includes details about the request parameters for each route. This can include:
- **Query parameters:** Parameters sent as part of the URL query string.
- **Body parameters:** Data sent as part of the request body (typically in JSON format).
- **Path parameters:** Variables included in the URL path.

## Summary

Nexa makes it easy to generate interactive, self-updating API documentation using Swagger and OpenAPI. By simply defining your routes and schemas, you get automatic, up-to-date documentation that describes:
- Your API endpoints.
- The required request parameters (query, body, path).
- The expected response format.

This is an essential feature for improving the developer experience and helping users understand how to interact with your API.

💡 Next Step: Explore [Advanced Topics](/advanced-topics)! 🚀