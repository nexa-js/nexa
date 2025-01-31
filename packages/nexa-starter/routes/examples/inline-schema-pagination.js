const schema = nexa.schema("ExampleSchemaInlinePagination", {
    // Define if mocks value should be based on input params or be always dynamic
    static: true,

    // Define pagination for schema and possible options
    pagination: {
        perPageOptions: [10, 50, 100],
    },
    
    response: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
            age: z.number(),
            email: z.string().email(),
        })
    )
});

nexa.get(schema);