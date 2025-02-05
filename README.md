# Nexa - The Future of API Orchestration for Frontend Development

[Docs](https://nexa-js.github.io/nexa) • [Examples](https://github.com/nexa-js/nexa/tree/main/examples)

Nexa is a cloud-native **Backend-for-Frontend (BFF)** framework designed to streamline frontend-backend communication. It enables rapid API development with built-in mocking, validation, testing, documentation, and data aggregation.

## Why Nexa?

Modern web applications require seamless frontend-backend communication, but traditional API development creates bottlenecks.

| Before Nexa: | After Implementing Nexa: |
| ------------ | ------------------------ |
| Frontend and backend teams often find themselves in a loop of clarifications, leading to delays. | Frontend teams can define and work with API routes instantly, enabling parallel development. |
| Frontend developers wait for backend APIs to be implemented before they can proceed, causing project slowdowns. |  Backend teams can later integrate business logic, ensuring it aligns with the predefined schemas. |
| Discrepancies in data formats and structures between teams lead to integration issues. | With clear contracts and mock data, both teams work more efficiently, reducing the need for constant communication. |

**Nexa** solves this by acting as an intelligent API layer between frontend and backend. It enables parallel development by letting frontend teams define data needs dynamically, while backend teams focus on integrating data sources.

## Development Workflow with Nexa

Nexa follows a **Schema-Driven Development** approach, reducing miscommunication between frontend and backend teams. Schemas serve as contracts, ensuring both teams have a clear understanding of data structures and API behaviors.
1. **Frontend developers define schemas & endpoints**
    - They declare API schemas (`query`, `body`, `response`) in the repo.
    - Nexa automatically generates **mock APIs**, allowing frontend work to proceed **without waiting for backend implementation**.
    - These schemas act as a **contract** for how the backend should behave.

2. **Backend developers implement logic**
    - When ready, backend developers use the existing schemas as **technical specifications**.
    - They **replace mocks with real logic**, ensuring seamless integration while maintaining consistency.

### Why Schema-Driven Development Helps:
- **Parallel Development:** Frontend & backend work independently with clear expectations.
- **Less Miscommunication:** Schemas define data contracts, preventing mismatches.
- **Faster Integration:** Mock APIs ensure frontend remains functional before backend is ready.
- **Validation & Testing:** Nexa enforces data integrity, reducing API errors.

This approach ensures a **smooth, efficient, and predictable development process**, making API collaboration effortless. 🚀

## Key Features

- **Schema-based**: Uses Zod for validation and auto-mocking.
- **Automatic mocking**: If a backend isn't implemented, Nexa will mock responses automatically.
- **File-based routing**: Uses Next.js-style routes.
- **Built-in pagination**.
- **Express.js** and full Express support (e.g., middlewares, CORS, etc.).
- **Static mocks generation** based on input params, query, and body to prevent frontend from acting randomly.
- **Auto Swagger docs generation**.
- **Integration tests** to help backend teams validate it follows frontend schema and requirements.

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

[Examples in Nexa Starter](https://nexa-js.github.io/nexa/#/)

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

