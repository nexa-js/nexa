const PersonDefaultSchema = nexa.schema("PersonDefaultSchema2", {
    pagination: {
        perPageOptions: [10, 50, 100],
    },

    query: z.object({
        test: z.string()
    }),
    // Body will be used for POST and PUT
    body: z.object({
        name: z.string(),
        age: z.number(),
        email: z.string().email(),
    }),
    response: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
            age: z.number(),
            email: z.string().email(),
        })
    )
});
