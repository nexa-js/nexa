nexa.schema("ExampleSchema", {
    static: false,

    query: z.object({
        test: z.string()
    }),
    
    response: z.object({
        id: z.number(),
        name: z.string(),
        age: z.number(),
        email: z.string().email(),
    })
});