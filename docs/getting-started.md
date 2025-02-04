# 🚀 Getting Started with Nexa  

## Overview  

Welcome to **Nexa**! This section will guide you through setting up your first Nexa project, understanding its structure, and creating your first API route.  

📌 **Why Nexa?**  
- **File-based API Routing** – Define routes without manual configuration.  
- **Zod-powered Validation** – Ensure data integrity with schema-based validation.  
- **Backend-driven Testing** – Write tests in just **5 lines of code**.  
- **Automatic API Documentation** – Get **OpenAPI/Swagger** docs instantly.  

---

## 🔨 Setting Up Your First Nexa Project  

If you haven’t installed Nexa yet, follow the **[Installation Guide](/installation)**.  

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

## ⚡ Running Nexa Locally

```bash
npm run dev  # For npm users
yarn dev     # For yarn users
```

### What This Does

- Starts a local development server.
- Auto-generates API routes from the `/routes/` folder.
- Provides an OpenAPI (Swagger) interface at `http://localhost:3000/api-docs`

## 🛠️ Creating Your First API Route

Nexa uses a file-based routing system like Next.js.

## ✅ Step 1: Create a Simple GET Route

Create a new file `routes/hello.js`

```javascript
nexa.schema('ExampleSchema', {
    response: z.object({ name: z.string(), age: z.number() }) // Defines response format
})

nexa.get('ExampleSchema', async ({ query }) => {
    return { name: "John Doe", age: 30 };
});
```

### What This Does

- Defines a `GET` `/hello` endpoint.
- Returns a mocked `JSON` response. Example: `{ "name": "Hello, Nexa!", age: 12 }`.

## 🚀 Next Steps

Now that you’ve set up Nexa, move on to:
- 📌 [Nexa API](/nexa-api) – Nexa API explanation
- 📌 [Nexa Router](/routes) – Learn about file-based routing and middleware.
- 📌 [Defining Advanced Schemas](/schemas) – Explore how Nexa uses Zod for request validation.