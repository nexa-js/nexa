# Nexa Schema

## What is Zod?

Zod is a tool that helps you define and validate data structures (called schemas). It's great for ensuring your data looks the way you expect. For example, if you're expecting a string or a number, Zod makes sure that’s exactly what you get. It works perfectly with Nexa to validate your API data.

## How Nexa Uses Zod

Nexa uses Zod to validate and shape your API data. Here's how:
- **Request Body**: Make sure the data sent in a request is what you expect (e.g., strings, numbers).
- **Query Parameters**: Check the parameters sent in the URL.
- **Response**: Make sure the data your API sends back is formatted correctly.
- **Mock Data**: Nexa can even generate mock data using Zod for when you don’t have a backend ready yet.

## Defining a Schema

To define a schema in Nexa, we use the `nexa.schema` function. You just need to give it a name and tell it how you want the data to be structured and validated. Here’s a basic example:

```javascript
nexa.schema("ExampleSchema", {
    static: false,  // mock data can change based on input
    pagination: { limits: [10, 20, 50] },  // pagination options
    query: z.object({
        test: z.string()  // query parameter: "test" must be a string
    }),
    body: z.object({
        name: z.string(),
        age: z.number(),
        email: z.string().email(),  // email must be a valid email format
    }),
    response: z.object({
        id: z.number(),
        name: z.string(),
        age: z.number(),
        email: z.string().email(),
    })
});
```

## Schema Example (Inline, Variable, String-Based)

### Inline Schema Definition

You can define a schema right inside your route if you want to keep things simple.

```javascript
nexa.schema("InlineSchemaExample", {
    response: z.object({
        id: z.number(),
        name: z.string(),
        age: z.number(),
        email: z.string().email(),
    })
})

nexa.get("InlineSchemaExample", (req, res) => {
    return { id: 1, name: "John Doe", age: 30, email: "john@nexa.com" };
});
```

### Variable-Based Schema Definition

You can also create a schema in a separate file in `/schemas` folder and then import it wherever you need it. This is useful if you want to reuse the same schema in multiple places.

**In schemas/example.js**

```javascript
// In schemas/example.js
export const ExampleSchema = z.object({
    id: z.number(),
    name: z.string(),
    age: z.number(),
    email: z.string().email(),
});
```

**In routes/example.js**

```javascript
// In your route file
import { ExampleSchema } from "../../schemas/example.js";

nexa.get(ExampleSchema);
```

### String-Based Schema Definition

Another way is to define the schema by name, storing the actual definition in a separate file. It keeps your code clean and organized.

```javascript
nexa.schema("ExampleSchema", {
    static: true,  // mock data is static
    response: z.object({
        id: z.number(),
        name: z.string(),
        age: z.number(),
        email: z.string().email(),
    })
});

nexa.get("ExampleSchema");
```

## Schema Reusability Examples

One of the best things about Nexa schemas is how easily you can reuse them across different routes and methods. Here’s how:

### Reusing a Schema in Multiple Routes

You can define a schema once and use it in as many routes as you want.

```javascript
// In schemas/example.js
export const ExampleSchema = z.object({
    id: z.number(),
    name: z.string(),
    age: z.number(),
    email: z.string().email(),
});

// In your route files
nexa.get(ExampleSchema);
nexa.post(ExampleSchema);
```

### Reusing Schema for Different Methods

You can use the same schema for different HTTP methods (like GET, POST, PUT) and add different business logic for each one.

```javascript
// GET route
nexa.get(ExampleSchema, (req, res) => {
    return { id: 1, name: "John Doe", age: 30, email: "john@nexa.com" };
});

// POST route
nexa.post(ExampleSchema, (req, res) => {
    return { id: 2, name: "Jane Smith", age: 25, email: "jane@nexa.com" };
});
```

## Table: Schema Parameters & Descriptions

| Parameter  	| Description |
|:-------------:|:-----------:|
| `static`        | Whether mock data is based on input params or always the same. Default is `true`. |
| `pagination`    | Configuration for pagination (e.g., `limits`). Default is `null`. |
| `query`      	| Zod configuration to validate query parameters (e.g., `?test=value`). |
| `body`      	| Zod configuration to validate the request body (`JSON`). |
| `response`   	| Zod configuration to validate the response data. |

💡 Next Step: Explore [Nexa Testing & Validation](/tests)! 🚀