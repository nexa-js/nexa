const PersonDefaultSchema = nexa.schema("PersonDefaultSchema", {
    pagination: {
        perPageOptions: [10, 50, 100],
    },

    query: z.object({
        test: z.string()
    }),
    // Body will be used for POST and PUT
    
    response: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
            age: z.number(),
            email: z.string().email(),
        })
    )
});

const PersonPatchSchema = nexa.schema("PersonPatchSchema", {
    body: z.object({
        // Only email can be updated with patch
        email: z.string().email(),
    }),
    // TODO fix inheritance
    response: PersonDefaultSchema.response
});

nexa.get(["PersonDefaultSchema"]);

nexa.patch(
    nexa.schema("PersonDefaultSchema", {
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
    })
    , (params) => {
        return 'abc abc'
    }, {
    tests: [{
        query: {
            name: 'John',
            age: 20,
            email: ''
        }
    }]
});