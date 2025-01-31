const schema = nexa.schema("ExampleSchemaInlineReadyFailed", {    
    response: z.object({
        id: z.number(),
        name: z.string(),
        age: z.number(),
        email: z.string().email(),
    })
});

nexa.get("ExampleSchemaInlineReadyFailed", (req, res) => {
    // make an api call and do whatever business logic you want

    // return the data in response format
    return {
        id: 1,
        name: "John Doe",
        age: 30,
    };
});