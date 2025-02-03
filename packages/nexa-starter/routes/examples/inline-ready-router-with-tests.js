const schema = nexa.schema("ExampleSchemaInlineReadyWithTests", {
    query: z.object({
        test: z.string().optional()
    }),

    response: z.object({
        id: z.number(),
        name: z.string(),
        age: z.number(),
        email: z.string().email(),
    })
});

nexa.get("ExampleSchemaInlineReadyWithTests", (req, res) => {
    // make an api call and do whatever business logic you want
    // This is example of data handling and business logic
    let name = "John Doe"

    if (req.query.test === "true") {
        name = "Jane Test";
    }

    // return the data in response format
    return {
        id: 1,
        name,
        age: 30,
        email: "john@nexa.com"
    };
}, {
    tests: [{
        query: {
            test: "true"
        },
    }, {
        query: {
            test: "false"
        },
    }]
});