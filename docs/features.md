Prepare docs & structure for open-source project

1. Add more examples for "Nexa Router". Provide file paths and route paths (same as next.js)
2. Rewrite text, add more details and description
3. Add examples to the right section for routing, add more examples for schema. Add examples how can be schema be re-used: string, variable, declaration inside the route.
4. Add more examples of routes, I need pairs of file path and how it converts to the route path
5. For the table Nexa API add arguments definition and explanation (in the brackets)
6. Feel free to update and change comments in the code
7. Use conversational and simple language

Here is information:

🚀 Nexa – The Future of API Orchestration for Frontend Development  

Overview

Nexa is a cloud-native Backend-for-Frontend (BFF) framework designed to streamline frontend-backend communication. It enables rapid API development with built-in mocking, validation, testing, documentation data aggregation.

Why Nexa

Modern web applications require seamless frontend-backend communication, but traditional API development creates bottlenecks:
- Frontend teams are blocked while waiting for backend endpoints.
- Backend teams struggle to predict frontend data requirements.
- Over-fetching and under-fetching make APIs inefficient.
- Security, caching, and transformations require extra effort.

🚀 Nexa solves this by acting as an intelligent API layer between frontend and backend. It enables parallel development by letting frontend teams define data needs dynamically, while backend teams focus on integrating data sources.

Key Features  

- Schema-based: Uses Zod for validation and auto-mocking.
- Automatic mocking: If a backend isn't implemented, Nexa will mock responses automatically
- File-based routing: Uses Next.js-style routes.
- Built-in pagination
- Express js and full express support e.g. middlewares, cors, etc
- Static mocks generation based on input params, query and body that prevents frontend to act randomly
- Auto swagger docs generation
- Integration tests make simple for backend team validate it follows frontend schema and requirements


Installation

With npx (Recommended)

The easiest way to get started with Nexa Starter is by using `npx`. Run the following command to automatically install and set up the project:

```bash
npx @nexa-js/nexa-create my-nexa-project
```

This command will:
- Install the project dependencies
- Set up the project structure
- Initialize everything needed to get the starter running


With npm/yarn


With npm:

```bash
npm install @nexa-js/nexa-core
```

With yarn:

```bash
yarn add @nexa-js/nexa-core
```

Getting Started

Basic Setup

To get started, you can import `launchNexa` into your project:

```javascript
import { launchNexa } from '@nexa-js/nexa-core';

launchNexa()
```

That's gonna launch express web server with schemas and routes configured located in these folders: `routes/*`, `schemas/*`

Project Structure

There are main 2 entities: schemas and routes

Entrypoint is index.js that contains `launchNexa` and callback function to modify express, add middlewares, etc for auth, cors controll, cache, etc by your needs

```javascript
import { launchNexa } from '@nexa-js/nexa-core';

// app is express app that you can modify as you wish
launchNexa((app) => {

})
```

Nexa API

`nexa-core` create global variables for

- Express App: `nexaApp`
- nexa API: `nexa`
- zod: `z`

We know that it might seems like anti-pattern but it helps to avoid multiple imports everytime defining routes and schemas

Table:

app: express instance
logger: centralized logger (see winston for more info) to log and debug your apps
schema: (name, options) helper to create new schema
makeRoute: (method, schemas, handler, options) helper to create route
get: (schemas, handler, options) helper to create GET route
post: (schemas, handler, options) helper to create POST route
put: (schemas, handler, options) helper to create PUT route
delete: (schemas, handler, options) helper to create DELETE route
patch: (schemas, handler, options) helper to create PATCH route

Nexa Router

All routes should be define in `routes/**/*.js` folder 

Next.js-like file routing.
Note: add explanation how does it work including path based variables, directory structure and routing examples

API is pretty simple. For all methods: get, post, etc
it has 3 arguments:
1. Schema – can be Name, or variable of the schema imported

Variable example
```
import { ExampleSchemaSimple } from "../../schemas/example-simple.js";

nexa.get(ExampleSchemaSimple);
```

String example
```
nexa.schema("ExampleSchemaSimple", {
    // Define if mocks value should be based on input params or be always dynamic
    static: false,

    // Schema for response
    response: z.object({
        id: z.number(),
        name: z.string(),
        age: z.number(),
        email: z.string().email(),
    })
});

nexa.get("ExampleSchemaSimple");
```

2. Backend Business logic callback to work with input params and create data aggregation and mapping

3. Options, currently it has "tests" optional only to create auto-integration tests

You can define: params, query, body that's gonna be set as input params, run you handler (2) and check if the response fits schema. You can define as many tests as you need

```javascript
nexa.get("ExampleSchemaInlineReadyWithTests", (req, res) => {
    // make an api call and do whatever business logic you want
    // This is example of data handling and business logic
    let name = "John Doe"

    if (req.query.test === "true") {
        name = "Jane Test";
    }

    // return the data in response format
    return {
        id: 1,
        name,
        age: 30,
        email: "john@nexa.com"
    };
}, {
    tests: [{
        query: {
            test: "true"
        },
    }, {
        query: {
            test: "false"
        },
    }]
});
```


Nexa Schema

nexa.schema arguments:
1. Name of the schema 
2. schema configuration 

Possible configuration:

All fields are optional

Better to make a table

1. static: default true - Define if mocks value should be based on input params or be always dynamic
2. pagination: default null - Pagination configuration, currently only supports limits
2.1. limits: possible limit options that can be sent
3. query: zod configuration for query parametrs 
4. body: zod configuration for body parametrs (json)
5. response: zod configuration for response (json), mocks configure following this rules

```javascript
nexa.schema("ExampleSchema", {
    // Define if mocks value should be based on input params or be always dynamic
    static: false,

    // Pagination configuration, currently only supports limits
    pagination: {
        limits: [10, 20, 50],
    },

    // Schema for query parameters
    query: z.object({
        test: z.string()
    }),

    // Schema for body parameters
    body: z.object({
        name: z.string(),
        age: z.number(),
        email: z.string().email(),
    }),

    // Schema for response
    response: z.object({
        id: z.number(),
        name: z.string(),
        age: z.number(),
        email: z.string().email(),
    })
});
```