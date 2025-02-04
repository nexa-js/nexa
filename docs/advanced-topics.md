# Advanced Topics

## Static vs. Dynamic Mocks

When working with Nexa, you can define mock data for your routes, which is useful during development when backend services may not be ready. Nexa allows you to choose between **static** and **dynamic** mocks.

- **Static Mocks:** These are pre-defined, fixed values returned by the API, regardless of the input parameters.
- **Dynamic Mocks:** These are generated based on input parameters, allowing more flexibility for mocking responses that depend on the request.

### Example of Static Mock:

```javascript
nexa.schema("StaticMockSchema", {
    static: true, // Static mock, always returns the same response
    response: z.object({
        id: z.number(),
        name: z.string(),
    }),
});
nexa.get("StaticMockSchema");
```

In this example, the mock response will always return the same values, regardless of the input.

### Example of Dynamic Mock:

```javascript
nexa.schema("DynamicMockSchema", {
    static: false, // Dynamic mock, changes based on input
    response: z.object({
        id: z.number(),
        name: z.string(),
    }),
});

nexa.get("DynamicMockSchema", (req, res) => {
    return {
        id: req.query.id, // Response varies based on the query parameter
        name: User ${req.query.id},
    };
});
```


In this example, the mock data changes based on the `id` query parameter.

## Pagination Support

Nexa provides built-in support for pagination, making it easier to handle large datasets and provide paginated responses for your API.

You can define pagination limits in your schema to restrict the number of items returned per page. Nexa will automatically handle pagination when these limits are specified.

### Example of Pagination in a Schema:

```javascript
nexa.schema("PaginatedSchema", {
    pagination: {
        limits: [10, 20, 50], // Define possible pagination limits
    },
    response: z.object({
        id: z.number(),
        name: z.string(),
    }), 
});

nexa.get("PaginatedSchema", (req, res) => {
    const { limit = 10, page = 1 } = req.query;
    const data = generateData(limit, page); // Your logic to fetch paginated data
    return data;
});
```

In this example, the API will return paginated data based on the `limit` and `page` query parameters. The response includes the paginated data and the total number of items.

```json
{
    "data": [{ ... }]
    "pagination": {
        "page": 1,
        "perPage": 10,
        "totalPages": 10,
        "totalRecords": 100,
    }
}
```

## Connecting to a Backend API

In many cases, your Nexa app will need to connect to a backend API to fetch or send data. You can easily integrate backend APIs into your Nexa routes by using HTTP clients such as `axios` or `node-fetch`.

### Example of Connecting to a Backend API:

```javascript
import axios from 'axios';

nexa.get("GetUserData", async (req, res) => {
    const userId = req.params.id;

    const response = await axios.get(`https://backend-api.com/users/${userId}`);

    return response.data;
});
```


In this example, Nexa fetches data from an external backend API using `axios` and returns the data in the response.

## Transforming Responses

Nexa also allows you to transform the data before sending the response. You can modify the response to fit your frontend needs or to apply additional formatting or filtering.

### Example of Transforming Responses:

```javascript
nexa.get("TransformResponse", (req, res) => {
    const data = {
        id: 1,
        name: "John Doe",
        age: 30,
        email: "john@example.com",
    };

    // Transform data before sending the response
    const transformedData = {
        userId: data.id,
        fullName: data.name,
        userAge: data.age,
    };

    return transformedData; // Return the transformed response
});
```


In this example, the data is transformed before sending the response to the frontend. You can modify the response to match the desired format or to include additional data.

---

## Summary

In Nexa, advanced topics help you handle more complex scenarios:
- **Static vs. Dynamic Mocks:** Choose between fixed or flexible mock data based on input parameters.
- **Pagination Support:** Easily handle large datasets and provide paginated responses.
- **Connecting to a Backend API:** Integrate external APIs into your Nexa routes to fetch or send data.
- **Transforming Responses:** Modify the response before sending it to the frontend to match your application's requirements.

These advanced features make Nexa a powerful tool for building efficient, flexible, and scalable APIs.

💡 Next Step: Explore [Deployment & Production Setup](/deployment)! 🚀