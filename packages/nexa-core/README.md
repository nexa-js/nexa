# **Nexa Core**

Nexa Core is the foundational package of the Nexa project. It provides essential utilities, abstractions, and services that power the Nexa ecosystem. This package is used as the core backend for all Nexa-powered projects, offering a set of APIs, services, and configuration tools that ensure seamless integration with other Nexa packages and applications.

## **Features**

- **Modular Architecture**: Nexa Core provides a clean and extensible architecture, enabling easy customization and addition of new features.
- **Easy Configuration**: Simple and intuitive configuration management to quickly set up your Nexa environment.
- **Interoperability**: Designed to work seamlessly with other Nexa packages and external services.
- **Scalable**: Built with scalability in mind, ensuring optimal performance for projects of any size.
- **Security**: Includes built-in mechanisms for secure authentication, authorization, and data handling.

## **Installation**

To install Nexa Core, you can use `npm` or `yarn`:

### With npm:

```bash
npm install @nexa-js/nexa-core
```

### With yarn:

```bash
yarn add @nexa-js/nexa-core
```

## Getting Started

### Basic Setup

To get started, you can import Nexa Core into your project:

```javascript
import { launchNexa } from '@nexa-js/nexa-core';

launchNexa()
```

That's gonna launch web server with schemas and routes configured located in these folders: `routes/*`, `schemas/*`