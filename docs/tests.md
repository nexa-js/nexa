# Testing & Validation

## Auto-mocking with Nexa

Nexa has built-in auto-mocking capabilities, which means if you don't have a backend implemented yet, Nexa can automatically generate mock data based on your schemas. This is great for front-end developers, as they can continue working on the UI without waiting for the backend to be ready.

When defining a schema in Nexa, you can set the `static` property to `false` to allow dynamic mock data generation. Nexa will automatically create mock responses based on the schema’s structure.

For example:

```javascript
nexa.schema("ExampleSchema", {
    static: false, // mock data can change based on input
    response: z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email(), 
    })
});
```


## Schema-Based Testing with Mocks

Tests are an essential part of ensuring that your APIs work as expected. Nexa makes it easy to define these tests directly in your route definitions.

Nexa tests run on **mocked data**, ensuring API responses match the defined schemas. When mocks are replaced with actual logic, tests continue validating responses against the same schemas, ensuring the expected format remains consistent.

You can define a test by adding the `tests` option when creating a route. Each test contains the input parameters (`query`, `body`, etc.) and the expected response schema. Nexa will run these tests using `nexa test` or `npm/yarn run test` in case you've created project using `npx`

### Example: Writing a Basic Test

```javascript
nexa.get("ExampleSchemaWithTest", (req, res) => {
    return {
        id: 1,
        name: "John Doe",
        email: "john@nexa.com"
    };
}, {
    tests: [
        { query: { test: "true" }, }
    ]
});
```


In the above example, Nexa will test the `GET` route by sending different `query` parameters (`test=true` and `test=false`) and validate the response against the defined schema.

## Test Cases for Routes

Each route can have multiple test cases, allowing you to cover different use cases and scenarios. Here's how you can define multiple tests for a single route:

### Example: Multiple Test Cases


```javascript
nexa.get("ExampleSchemaWithTest", (req, res) => {
    return {
        id: 1,
        name: "John Doe",
        email: "john@nexa.com"
    };
}, {
    tests: [
        { query: { test: "true" }, },
        { query: { test: "false" }, },
        { query: { test: "abc" }, },
    ]
});
```


In this case, the route will be tested three times with different `query` values, ensuring that the business logic works for multiple scenarios.

### Example: Mocking in Nexa

Nexa provides a setup parameter inside test definitions, allowing developers to prepare necessary mocks before executing the test. This ensures that external services, databases, or any dependencies are correctly simulated, making tests fully isolated and predictable.
```javascript
nexa.post("ExampleSchemaWithTest", async (req, res) => {
    const userResponse = await fetch('https://api.example.com/users/1');
    const userData = await userResponse.json();
    return userData;
}, {
    tests: [
        {
            body: { name: "John Doe", email: "john@nexa.com" },
            setup: async () => {
                nock('https://api.example.com')
                    .get('/users/1')
                    .reply(200, { id: 1, name: 'John Doe' });
                global.mockDatabase = {
                    users: [{ id: 1, name: "John Doe", email: "john@nexa.com" }]
                };
            }
        },
    ]
});
```


## Summary

Nexa makes testing and validation simple by:
- Automatically mocking data when a backend isn't available.
- Allowing you to define tests directly in your route options.
- Running multiple test cases to validate routes under different conditions.

This helps ensure that your API is working as expected and that your frontend developers can continue working without waiting for the backend to be fully implemented.

💡 Next Step: Explore [Middleware & Customization](/customization)! 🚀