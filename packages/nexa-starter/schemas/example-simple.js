export const ExampleSchemaSimple = nexa.schema("ExampleSchemaSimple", {
    // Define if mocks value should be based on input params or be always dynamic
    static: false,

    // Schema for response
    response: z.object({
        id: z.number(),
        name: z.string(),
        age: z.number(),
        email: z.string().email(),
    })
});