
nexa.get(
    nexa.schema("ExampleSchemaInlineT", {
        static: false,

        params: z.object({
            category: z.string(),
            id: z.string(),
        }),

        query: z.object({
            test: z.string(),
            
        }),

        response: z.object({
            id: z.number(),
            name: z.string(),
            age: z.number(),
            email: z.string().email(),
        })
    })
);