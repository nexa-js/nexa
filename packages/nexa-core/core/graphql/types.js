import { NexaSchemas } from "../schemas.js";
import { convertZodSchemaToGraphQLTypes } from "./zod-to-graphql.js";

function splitCamelAndUnderscore(str) {
    // Step 1: Replace underscores with spaces.
    const withoutUnderscores = str.replace(/_/g, ' ');
    
    // Step 2: Insert a space before an uppercase letter that follows a lowercase letter.
    // This handles camel case splitting.
    const withSpaces = withoutUnderscores.replace(/([a-z])([A-Z])/g, '$1 $2');
    
    // Step 3: Split by one or more spaces.
    const words = withSpaces.split(/\s+/).filter(Boolean);
    
    // Step 4 (Optional): Normalize words (e.g., capitalize the first letter).
    const normalized = words.map(
      word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    
    return normalized;
  }

// Join all strings and return CamelCase
const prepareName = (schemaName, ...args) => {
    schemaName = splitCamelAndUnderscore(schemaName)
    args = [
        ...schemaName,
        ...args,
    ];

    return args.join(' ').split(' ').map((word) => {
        return word.toLowerCase().charAt(0).toUpperCase() + word.slice(1);
    }).join('');
}

export const createTypeDefs = () => {
    let typeDefs = {
        "Query": "type Query { hello: String }",
    }

    let typeDefsMapping = {}

    Object.entries(NexaSchemas).forEach(([name, values]) => {
        const types = ['params', 'query', 'body', 'response'];
        
        typeDefsMapping[name] = {};

        for(const type of types) {
            if(values[type]) {
                let typeName = prepareName(name, type)
                typeDefsMapping[name][type] = typeName;
                nexa.logger.info(`Creating type ${typeName}`);
                typeDefs[typeName] = convertZodSchemaToGraphQLTypes(typeName, values[type]);
            }
        }
    });

    return Object.values(typeDefs).join('\n\n');
}