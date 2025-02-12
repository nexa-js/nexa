// zod-to-gql.js
import {
    z,
    ZodType,
    ZodString,
    ZodNumber,
    ZodBoolean,
    ZodOptional,
    ZodArray,
    ZodObject,
} from "zod";



// Registry for storing generated GraphQL type definitions.
const generatedTypes = new Map();

// Helper: Capitalize the first letter.
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Recursively processes a Zod schema and returns an object with:
 *   - gqlType: the GraphQL type string (e.g. "String", "Float", "User", or "[User!]")
 *   - isScalar: whether the type is a scalar.
 *   - nullable: whether the field should be considered nullable.
 *
 * The options parameter supports:
 *   - forceNullable: if true, then object fields are generated without "!".
 */
function processSchema(schema, typeName, options = {}) {
    // Unwrap optional types.
    if (schema instanceof ZodOptional) {
        const inner = schema._def.innerType;
        const result = processSchema(inner, typeName, options);
        return { ...result, nullable: true };
    }

    // Handle arrays: process the inner type.
    if (schema instanceof ZodArray) {
        // Derive an inner type name. (It will be overridden later for a top-level array.)
        const innerTypeName = typeName ? typeName + "Item" : "Item";
        // For inner array items, force fields to be nullable.
        const innerResult = processSchema(schema._def.type, innerTypeName, { forceNullable: true });
        // The list itself is non-null and we want non-null items.
        return { gqlType: `[${innerResult.gqlType}!]`, isScalar: false, nullable: false };
    }

    // Map scalar types.
    if (schema instanceof ZodString) return { gqlType: "String", isScalar: true, nullable: false };
    if (schema instanceof ZodNumber) return { gqlType: "Float", isScalar: true, nullable: false };
    if (schema instanceof ZodBoolean) return { gqlType: "Boolean", isScalar: true, nullable: false };

    // Handle objects by generating (or reusing) a GraphQL type.
    if (schema instanceof ZodObject) {
        // Use the provided typeName (capitalized) or a default.
        const name = typeName ? capitalize(typeName) : "NestedObject";
        if (!generatedTypes.has(name)) {
            const shape = schema.shape || (schema._def && schema._def.shape);
            if (!shape) {
                throw new Error("The provided object schema does not have a shape: " + name);
            }
            let fieldsSDL = "";
            // Process each field in the object.
            for (const key in shape) {
                const fieldSchema = shape[key];
                // For nested objects or arrays, derive a field-specific type name.
                let fieldTypeName;
                if (fieldSchema instanceof ZodObject || fieldSchema instanceof ZodArray) {
                    fieldTypeName = name + capitalize(key);
                }
                const result = processSchema(fieldSchema, fieldTypeName, options);
                // When forceNullable is true, do not add a "!" even for required fields.
                const required = !options.forceNullable && !(fieldSchema instanceof ZodOptional);
                fieldsSDL += `  ${key}: ${result.gqlType}${required ? "!" : ""}\n`;
            }
            if (fieldsSDL !== "") {
                const typeDef = `type ${name} {\n${fieldsSDL}}`;
                generatedTypes.set(name, typeDef);
            }
        }
        return { gqlType: name, isScalar: false, nullable: false };
    }

    // Fallback.
    return { gqlType: "String", isScalar: true, nullable: false };
}

/**
 * Converts a top-level Zod schema into GraphQL SDL.
 *
 * If the top-level schema is an array, it generates two types:
 *   - A wrapper type (named by topTypeName) with a field "items: [InnerType!]!"
 *   - An inner type for the array items.
 *
 * If the schema is an object, it is processed normally.
 */
export function convertZodSchemaToGraphQLTypes(topTypeName, schema) {
    generatedTypes.clear();

    // Special handling for a top-level array.
    if (schema instanceof ZodArray) {
        // Derive an inner type name using a naming convention.
        // For example, if topTypeName ends with "ReadyResponse", replace it with "PaginationResponseItem".
        let innerTypeName;
        if (topTypeName.endsWith("ReadyResponse")) {
            innerTypeName = topTypeName.replace(/ReadyResponse$/, "PaginationResponseItem");
        } else {
            innerTypeName = topTypeName + "Item";
        }
        // Process the inner schema with forceNullable so its fields have no trailing "!".
        processSchema(schema._def.type, innerTypeName, { forceNullable: true });
        // Create the wrapper type with an "items" field.
        const wrapperType = `type ${topTypeName} {\n  items: [${innerTypeName}!]!\n}`;
        generatedTypes.set(topTypeName, wrapperType);
    } else {
        processSchema(schema, topTypeName);
    }

    let allTypes = "";
    for (const typeDef of generatedTypes.values()) {
        allTypes += typeDef + "\n\n";
    }

    return allTypes.trim();
}