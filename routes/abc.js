const { z } = require("zod");

const PersonDefaultSchema = nexa("PersonDefaultSchema", {
    query: z.object({
        name: z.string()
    }),
    // Body will be used for POST and PUT
    // body: z.object({
    //     name: z.string(),
    //     age: z.number(),
    //     email: z.string().email(),
    // }),
    response: z.array(
            z.object({
            id: z.number(),
            name: z.string(),
            age: z.number(),
            email: z.string().email(),
        })
    )
});

const PersonPatchSchema = nexa("PersonPatchSchema", {
    body: z.object({
        // Only email can be updated with patch
        email: z.string().email(),
    }),
    // TODO fix inheritance
    response: PersonDefaultSchema.response
});

route.get(["PersonDefaultSchema"], (params) => {
    // return 'abc abc'
}, {
    tests: [{
        query: {
            name: 'John',
            age: 20,
            email: ''
        }
    }]
});
route.patch([PersonPatchSchema, "PersonDefaultSchema"], (params) => {
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