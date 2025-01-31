nexa.get(
    nexa.schema("ExampleSchemaWithParams", {
        params: z.object({
            category: z.string(),
            id: z.string(),
        }),

        response: z.object({
            id: z.number(),
            name: z.string(),
            age: z.number(),
            email: z.string().email(),
        })
    })
);