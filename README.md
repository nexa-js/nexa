[![npm version](https://img.shields.io/npm/v/@nexa-js/nexa-core?color=blue&label=Nexa)](https://www.npmjs.com/package/@nexa-js/nexa-core)

# Nexa - The Future of API Orchestration for Frontend Development

[Docs](https://nexa-js.github.io/nexa) • [Examples](https://github.com/nexa-js/nexa/tree/main/packages/nexa-starter)

Nexa is a **Backend-for-Frontend (BFF)** framework designed to streamline communication between frontend and backend teams. Built on a **Schema-Driven Development (SDD)** approach, Nexa creates a living API contract that serves as the single source of truth for your application’s data structures and behaviors.

## Why Nexa?

Modern web applications demand rapid, error-free collaboration between frontend and backend teams. Traditional API development often results in endless clarifications, miscommunications, and integration headaches. Nexa tackles these issues by:

- **Establishing Clear API Contracts:**  
  Frontend teams define the expected schemas for inputs, outputs, and endpoints before any backend code is written. This creates a living, evolving blueprint that everyone agrees on.
- **Enabling Parallel Development:**  
  With auto-generated mocks, tests, documentation, and even TypeScript services from a simple schema, frontend teams can work independently—without waiting for backend implementations.
- **Reducing Miscommunication:**  
  By using schemas as a contract, both teams have a clear, technical specification that minimizes integration errors and debates over data formats.

| Before Nexa: | After Implementing Nexa: |
| ------------ | ------------------------ |
| Frontend and backend teams are stuck in endless clarification loops, causing delays. | Frontend teams define API routes and data contracts instantly, enabling true parallel development. |
| Backend APIs are built ad hoc, leading to mismatches in data formats and functionality. | Backend logic is implemented against a predefined, versioned schema, ensuring consistency and reliability. |
| Miscommunication leads to integration issues and unpredictable behavior in production. | A living API contract and auto-generated mocks keep everyone aligned and reduce surprises. |


## How It Works

Nexa follows a **Schema-Driven Development** workflow where API contracts are defined, agreed upon, and then used to drive the entire development process:

1. **Frontend Developers Define Schemas & Endpoints**  
   - Declare API schemas (for query, body, and response) in the repository.
   - Automatically generate RESTful and GraphQL endpoints, along with tests, mocks, and documentation.
   - Use these schemas as a binding contract that sets clear expectations for both frontend and backend.

2. **Backend Developers Implement Business Logic**  
   - Use the predefined schemas as technical specifications.
   - Replace mocks with real data connectors once business logic is ready, ensuring seamless integration.
   - Maintain consistency with the living contract that evolves with the application.

## Key Benefits of Schema-Driven Development with a BFF

- **Single Source of Truth:**  
  The API contract is defined up front and maintained as a living document, reducing miscommunication and surprises.

- **Rapid Iteration & Parallel Development:**  
  Frontend teams work with auto-generated mocks and services (RESTful, GraphQL, tests, docs) while backend teams focus on implementing robust business logic.

- **Enhanced Consistency & Quality:**  
  Built-in validation, testing, and documentation ensure that every change is controlled and that data integrity is maintained.

- **Streamlined Integration:**  
  When the backend is ready, mocks are seamlessly replaced with real data connectors without breaking the contract.

## Key Features

- **Schema-based:** Uses Zod for validation and auto-mocking.
- **Automatic Mocking:** If a backend isn’t implemented, Nexa will automatically provide realistic mock responses.
- **File-based Routing:** Inspired by Next.js-style routing.
- **Built-in Pagination:** Efficiently handle large datasets.
- **Full Express.js Support:** Leverage Express middlewares, CORS, and more.
- **Static Mocks Generation:** Based on input parameters, query, and body to keep the frontend experience consistent.
- **Automatic Swagger Documentation Generation:** Keeping your docs always up to date.
- **Integration Tests:** Ensure that backend implementations conform to the agreed API schema.


## Documentation

For detailed documentation, please visit the official docs:

[Read the Documentation](https://nexa-js.github.io/nexa/#/)

## Installation

### With npx (Recommended)

The easiest way to get started with Nexa is by using `npx`. Run the following command to automatically install and set up the project:

```bash
npx @nexa-js/nexa-create my-nexa-project
```

This will:
- Install project dependencies.
- Set up the project structure.
- Initialize everything needed to get the starter running.

## Getting Started

### Basic Setup

To get started, import launchNexa into your project:

```javascript
import { launchNexa } from '@nexa-js/nexa-core';

launchNexa()
```

This will launch the Express web server with schemas and routes configured in the `routes/*` and `schemas/*` folders.

### Project Structure

There are two main entities: `schemas` and `routes`. The entry point is `index.js`, which contains `launchNexa` and allows you to modify the Express server (e.g., add middlewares, configure auth, CORS, etc.).

## Examples

Check out the examples for different route setups and configurations in the Nexa Starter project:

[Examples in Nexa Starter](https://github.com/nexa-js/nexa/tree/main/packages/nexa-starter)

## Plans

- [x] MVP Release – Core features implemented and ready to use 🎉
- [ ] Backend Connectors – Seamless integration with databases and external APIs
- [ ] Web UI for API Management – Easily configure and monitor APIs visually
- [ ] Cloud Version – Fully managed deployment for hassle-free usage
- [ ] AI-Powered Connectors & Logic – Automate connector generation and business logic with AI

## Contribution

We welcome contributions to the Nexa project! If you’d like to contribute, please follow these steps:

1. **Fork the repository** and create a branch for your changes.
2. **Clone your fork** to your local machine and create your changes.
3. **Commit your changes** with a clear description.
4. **Push your changes** to your fork.
5. **Open a pull request (PR)** to the main repository, describing the changes you made.
6. Be responsive to feedback, and if necessary, make changes based on the review.

For more details, check out the full [Contribution Guide](https://nexa-js.github.io/nexa/#/contribution).

### Code Style & Best Practices

- Use consistent **camelCase** for variables and functions, and **PascalCase** for components and schemas.
- Ensure your code is well-documented and adheres to the existing coding standards.
- Write tests for any new features or bug fixes.
- Keep commit messages clear and descriptive.

---

## License

Nexa is open-source and available under the [Apache 2.0 License](https://opensource.org/licenses/Apache-2.0).

