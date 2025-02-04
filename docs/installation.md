# 📦 Installation  

## Overview  

Installing Nexa is quick and straightforward. You can set it up using **npx**, **npm**, or **yarn**. Nexa is designed to integrate seamlessly with your backend projects while maintaining flexibility for various environments.  

**Key Highlights of Installation**  
- **Zero-config setup** – Start using Nexa instantly.  
- **Supports npm, yarn, and npx** – Install it with your preferred package manager.  
- **Minimal dependencies** – Ensures lightweight installation.  
<!-- - **Works with TypeScript** – Full TypeScript support for type safety.   -->

---

## 📥 Installing Nexa  

There are multiple ways to install Nexa based on your preference:  

### ✅ Recommended: Install via `npx` (One-Command Setup)  

If you want the fastest setup, use `npx` to install and initialize Nexa in your project:  

```sh
npx @nexa-js/nexa-create my-nexa-project
```

### What This Does

- Installs Nexa without needing to manually clone a repository.
- Sets up a ready-to-use project structure.
- Automatically installs required dependencies.

## 🔧 Project Structure

After running `npx @nexa-js/nexa-create my-nexa-project`, your folder structure will look like this:

```
my-nexa-project/
│── routes/               # API routes (file-based routing)
│   ├── users.js          # Example route (GET /users)
│   ├── posts.js          # Example route (GET /posts)
│── schemas/              # Zod schemas for request/response validation
│── index.js              # Nexa entrypoint
│── package.json          # Project metadata
│── node_modules/         # Installed dependencies
```

## Alternative

After manual installation you have to configure `index.js`, `/routes`, and `/schemas` by yourself

### Install via npm

If you prefer using npm, install Nexa manually:

```bash
mkdir my-nexa-project && cd my-nexa-project
npm init -y
npm install nexa-core
```

#### Steps Explained
- `mkdir my-nexa-project && cd my-nexa-project` – Creates a new project directory.
- `npm init -y` – Initializes a Node.js project with a default package.json.
- `npm install nexa-core` – Installs the core Nexa package.

### Install via yarn

For yarn users, install Nexa manually:
```
mkdir my-nexa-project && cd my-nexa-project
yarn init -y
yarn add nexa-core
```

#### Steps Explained
- `mkdir my-nexa-project && cd my-nexa-project` – Creates a new project directory.
- `yarn init -y` – Initializes a Node.js project with a default package.json.
- `yarn add nexa-core` – Installs the core Nexa package.


## Key Files & Folders

- `/routes/` – Contains API endpoints.
- `/schemas/` – Stores Zod schemas for validation.
- `index.js` – Nexa entrypoint & Config file for middleware, authentication, and setting

## 🏗️ Verifying the Installation

After installation, run the Nexa development server to ensure everything is working:

```bash
npm run dev  # For npm users
yarn dev     # For yarn users
```

### What This Does:

- Starts a local development server.
- Auto-generates API routes from the `/routes/` folder.
- Provides an OpenAPI (Swagger) interface at `http://localhost:3000/api-docs`

## 🚀 Next Steps

Once installed, move on to:

- 📌 [Getting Started](/getting-started) – Understanding Nexa's structure and defining your first route.
- 📌 [Defining API Routes](/routes) – Learn how Nexa handles API routing.
- 📌 [Using Schemas](/schemas) – Explore data validation with Zod.