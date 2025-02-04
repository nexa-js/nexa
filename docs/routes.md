# 🌐 Nexa Router

## Overview  

Nexa follows a **Next.js-style file-based routing system**, allowing developers to define API endpoints by simply creating files inside the `routes/` directory.  

✅ **Key Benefits:**  
- No need to manually register routes – Nexa automatically detects them.  
- Uses **file paths as API endpoints**, reducing boilerplate.  
- Supports **dynamic routes** (e.g., `/users/:id`).  
- Integrates **middleware** at both route and global levels.  

---

## 📂 File-Based Routing  

All routes are defined inside the `routes/` folder.  

🛠 **Basic Rules:**  
- The filename **determines the route path**.  
- Dynamic parameters use **square brackets** (`[param]`).  
- Nested folders **represent route prefixes**.  

### 📌 Folder Structure Example  

```
routes/ ├── users/ │ ├── index.js → GET /users │ ├── [id].js → GET /users/:id │ ├── create.js → POST /users/create ├── posts/ │ ├── index.js → GET /posts │ ├── [slug].js → GET /posts/:slug ├── health.js → GET /health
```


📌 **How It Works:**  
- `routes/users/index.js` → **Maps to** `GET /users`  
- `routes/users/[id].js` → **Maps to** `GET /users/:id`  
- `routes/users/create.js` → **Maps to** `POST /users/create`  
- `routes/posts/[slug].js` → **Maps to** `GET /posts/:slug`  

💡 **Why This Matters?**  
- Reduces **boilerplate code** – no need to register routes manually.  
- **Scales effortlessly** as the project grows.  
- **Familiar to Next.js users**.  

---

## 🔍 How Route Paths Are Determined  

| **File Path** | **Generated Route** | **HTTP Method** |
|--------------|--------------------|----------------|
| `routes/users/index.js` | `/users` | `GET` |
| `routes/users/[id].js` | `/users/:id` | `GET` |
| `routes/users/create.js` | `/users/create` | `POST` |
| `routes/posts/[slug].js` | `/posts/:slug` | `GET` |
| `routes/health.js` | `/health` | `GET` |

📌 **Dynamic Parameters**  
- `[id].js` → Becomes `/:id`  
- `[slug].js` → Becomes `/:slug`  

---

## 🏗️ Defining Routes  

Each route file must:  
1. **Define a schema** – Ensures validation and type safety.  
2. **Specify a handler** – Implements request processing logic.  
3. **(Optional) Add middleware** – For authentication, logging, etc.  

---

## 🔹 Route Examples  

### Simple Route (`/health`)  

File example path: `/routes/health.js` that's gonna be available at `[GET] http://localhost:{port}/health`

```javascript
nexa.get("HealthCheckSchema", (req, res) => {
    return { status: "OK" };
});
```

📌 No dynamic parameters – Directly returns a response.

### Dynamic Route (`/users/:id`)

File example path: `/routes/users/[id].js` that's gonna be available at `[GET] http://localhost:{port}/users/123`

```javascript
nexa.get("UserSchema", (req, res) => {
    return { id: req.params.id, name: "John Doe" };
});
```
📌 Extracts id from the URL using req.params.id.

### Using a Schema Variable

File example path: `/routes/example.js` that's gonna be available at `[GET] http://localhost:{port}/example`

```javascript
import { ExampleSchemaSimple } from "../../schemas/example-simple.js";

nexa.get(ExampleSchemaSimple);
```

📌 Reuses an imported schema for validation.

### Defining a Schema Inline

File example path: `/routes/example.js` that's gonna be available at `[GET] http://localhost:{port}/example`

```javascript
nexa.schema("ExampleSchemaSimple", {
    static: false,
    response: z.object({
        id: z.number(),
        name: z.string(),
        age: z.number(),
        email: z.string().email(),
    })
});

nexa.get("ExampleSchemaSimple");
```
## ✅ Summary

1. Nexa follows file-based routing – no need to manually define paths.
2. Dynamic parameters use [param].js inside routes/.
3. All routes require a schema (inline or imported).

💡 Next Step: Explore Zod-powered schemas in [Nexa Schema](/schemas)! 🚀