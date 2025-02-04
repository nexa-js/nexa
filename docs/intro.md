# 📖 Introduction to Nexa  

The dynamic between frontend and backend teams often leads to miscommunication and delays

| Before Nexa: | After Implementing Nexa: |
| ------------ | ------------------------ |
| Frontend and backend teams often find themselves in a loop of clarifications, leading to delays. | Frontend teams can define and work with API routes instantly, enabling parallel development. |
| Frontend developers wait for backend APIs to be implemented before they can proceed, causing project slowdowns. |  Backend teams can later integrate business logic, ensuring it aligns with the predefined schemas. |
| Discrepancies in data formats and structures between teams lead to integration issues. | With clear contracts and mock data, both teams work more efficiently, reducing the need for constant communication. |

## Overview  

Nexa is an open-source **Backend-for-Frontend (BFF)** framework that simplifies API development, mocking, and schema validation using **Zod**. It is designed to bridge the gap between frontend and backend development by providing a **file-based API structure**, **automatic request validation**, **testing capabilities**, and **auto-generated documentation**.  

With Nexa, you can:  
- Define API routes quickly using a **Next.js-style file-based router**  
- Automatically **mock API responses** with static or dynamic data  
- Use **Zod for schema validation** to enforce request and response structures  
- **Generate OpenAPI (Swagger) documentation** without extra configuration  
- **Write backend-driven tests in just 5 lines of code**  
- Integrate **Express middleware** for authentication, logging, and security  

## Why Nexa?  

### 🛠️ Common API Development Challenges 

Modern applications require seamless frontend-backend communication, but API development introduces several challenges:  

1. **Time-Consuming API Development** – Setting up a backend, defining routes, and handling validation can take a long time.  
2. **Inconsistent Data Contracts** – Frontend and backend teams often struggle with mismatched request/response formats.  
3. **Complex Mocking and Testing** – Developers need reliable mock data for testing without setting up an entire backend.  
4. **Documentation Maintenance** – Keeping API docs up to date is often a manual and error-prone process.  
5. **Lack of Backend Validation** – APIs often lack automated tests to ensure responses match frontend expectations.  

### 🚀 How Nexa Solves These Problems  
Nexa automates many aspects of API development, allowing developers to focus on building features rather than managing infrastructure:  
- **Schema-Based API Definitions** – Use **Zod schemas** to enforce request and response formats automatically.  
- **Instant API Mocking** – Generate mock data without writing additional logic.  
- **File-Based Routing** – Define API endpoints using a simple file structure.  
- **Automatic OpenAPI Documentation** – Swagger UI is generated from your route definitions.  
- **Built-In Pagination & Filtering** – Handle complex data structures easily.  
- **Middleware Support** – Add authentication, rate limiting, or custom logic seamlessly.  
- **Effortless Backend-Driven Testing** – Define API tests in just **5 lines of code** to validate backend responses match frontend expectations.  


## Key Features  

| Feature | Description |
|---------|------------|
| **File-Based Routing** | Define API routes like Next.js without manual routing setup. |
| **Schema-Driven Validation** | Uses **Zod** to enforce input/output validation. |
| **Automatic Mocking** | Returns mock data without needing a database. |
| **Swagger Documentation** | Generates OpenAPI docs automatically. |
| **Pagination & Filtering** | Supports query-based pagination out of the box. |
| **Express Middleware Support** | Easily integrate authentication, logging, and security features. |
| **Backend-Driven Testing** | Write API tests in 5 lines of code to validate backend responses match schemas. |
| **Static vs. Dynamic Mocking** | Generate predictable (static) or randomized (dynamic) mock data. |


## How Nexa Works  

Nexa provides an easy-to-use API development workflow:  

1. **Define an API Route** in the `/routes` directory.  
2. **Attach a Schema** using **Zod** for request validation.  
3. **Handle the Request** in a **handler function**.  
4. **Write Tests (Optional)** to validate backend responses.
5. **Generate API Documentation** automatically with **Swagger**.  

### Example: Simple Nexa Route  

Here’s how you can create an API endpoint in Nexa:  

```javascript
nexa.schema('ExampleSchema', {
    query: z.object({ id: z.string() }), // Validates query params
    response: z.object({ name: z.string(), age: z.number() }) // Defines response format
})

nexa.get('ExampleSchema', async ({ query }) => {
    return { name: "John Doe", age: 30 };
});
```

#### What Happens Here?
- Schema `query` ensures the request has an id parameter.
- Schema `response` defines the expected response format.
- The handler function processes the request


### Example: Backend-Driven Testing in 5 Lines of Code  
Nexa allows backend developers to define **integration tests** directly within the API definition. This ensures that **data returned by the backend always aligns with the schema expected by the frontend**.  

```javascript
nexa.get("ExampleSchemaWithTests", (req, res) => {
  return { id: 1, name: "John Doe", age: 30, email: "john@nexa.com" };
}, {
  tests: [{ query: { test: "true" } }, { query: { test: "false" } }]
});
```

#### What Happens Here?

1. Defines an API route with a schema.
2. Includes test cases that validate backend responses against the expected schema.
3. Ensures that if the backend changes, tests will fail automatically if data doesn't match the schema.
4. No frontend setup required – validation is handled entirely in the backend.

## Next Steps

Now that you understand what Nexa is and why it’s useful, you can move on to:
- 📌 [Installation](/installation) – Setting up Nexa in your project.
- 📌 [Getting Started](/getting-started) – Understanding the project structure.
- 📌 [Defining Routes](/routes) – Creating your first API.