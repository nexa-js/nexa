# ⚙️ Nexa API  

## Overview  

The **Nexa API** provides a simple, structured way to define API routes, schemas, and request handlers. Nexa is built on top of **Express.js**, but it removes much of the boilerplate by offering a declarative, file-based approach to API development.  

### 🚀 Key Highlights  
- **File-based API definition** – No need to manually register routes.  
- **Zod-Powered Schema Validation** – Ensure data integrity with runtime validation.  
- **Automatic API Documentation** – Uses OpenAPI for Swagger-based docs.  
- **Express.js Middleware Support** – Add CORS, authentication, logging, and more.  
- **Backend-Driven Testing** – Define tests in **5 lines of code**.  

---

## 🔧 Global Variables  

Nexa automatically creates global variables to simplify API development and reduce redundant imports.  

| Variable | Description |
|----------|------------|
| `nexaApp` | Express instance – allows you to customize middleware, logging, and server settings. |
| `nexa` | Main Nexa API object used to define routes. |
| `z` | Zod schema validation library, used for defining request and response validation. |

💡 **Why Global Variables?**  

Global variables help **avoid repetitive imports** when defining routes and schemas, making Nexa more concise and intuitive.

---

## 📌 API Functions  

Nexa provides several helper functions for defining routes and schemas:  

| Function | Arguments | Description |
|----------|-----------|-------------|
| `logging` | - | Nexa integrates well with `Winston`, a popular logging library |
| `schema(name, options)` | `name` (string), `options` (object) | Defines a new **Zod-based schema** for validation. |
| `makeRoute(method, schemas, handler, options)` | `method` (string), `schemas` (object), `handler` (function), `options` (object) | Generic helper to define an API route. |
| `get(schemas, handler, options)` | `schemas` (object), `handler` (function), `options` (object) | Defines a **GET** route. |
| `post(schemas, handler, options)` | `schemas` (object), `handler` (function), `options` (object) | Defines a **POST** route. |
| `put(schemas, handler, options)` | `schemas` (object), `handler` (function), `options` (object) | Defines a **PUT** route. |
| `delete(schemas, handler, options)` | `schemas` (object), `handler` (function), `options` (object) | Defines a **DELETE** route. |
| `patch(schemas, handler, options)` | `schemas` (object), `handler` (function), `options` (object) | Defines a **PATCH** route. |

---

## 🚀 Next Steps

Once installed, move on to:

- 📌 [Defining API Routes](/routes) – Learn how Nexa handles API routing.
- 📌 [Using Schemas](/schemas) – Explore data validation with Zod.
