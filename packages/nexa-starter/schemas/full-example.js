export const ExampleSchema = nexa.schema("ExampleSchema", {
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