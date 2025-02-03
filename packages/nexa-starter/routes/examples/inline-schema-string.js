nexa.schema("ExampleSchemaInlineString", {
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

nexa.get("ExampleSchemaInlineString");
nexa.post("ExampleSchemaInlineString");
nexa.put("ExampleSchemaInlineString");
nexa.patch("ExampleSchemaInlineString");
nexa.delete("ExampleSchemaInlineString");
