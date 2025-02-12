import { NexaRoutes } from "../routes.js";
import { z, ZodObject } from "zod";
import { convertZodSchemaToGraphQLTypes } from "./zod-to-graphql.js";
import { findSchema } from "../../utils/schemas.js";
import { UnifiedResponse } from "../responses.js";

function splitCamelAndUnderscore(str) {
    // Step 1: Replace underscores with spaces.
    const withoutUnderscores = str.replace(/_/g, ' ').replace(/-/g, ' ');

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

/**
 * Safely merges multiple Zod schemas. Any value that is not an instance
 * of ZodObject is ignored. If none are provided, returns an empty object schema.
 *
 * @param  {...any} schemas Zod schemas (or other values)
 * @returns {import("zod").ZodObject<any>} The merged Zod object schema.
 */
function safeMergeSchemas(...schemas) {
    return schemas.reduce((acc, schema) => {
        // Only merge if schema is a valid ZodObject
        if (schema && schema instanceof ZodObject) {
            return acc.merge(schema);
        }
        return acc;
    }, z.object({}));
}

const QUERY_TYPE = 'query';
const MUTATION_TYPE = 'mutation';

let hasQuery = false;
let hasMutation = false;

const resetValues = () => {
    hasQuery = false;
    hasMutation = false;
}

function createRes() {
    // We'll use a Promise that resolves when json is called.
    let resolveJson;
    const resultPromise = new Promise((resolve) => {
        resolveJson = resolve;
    });

    return {
        /**
         * Simulates sending a JSON response.
         * When called, it resolves the promise with the given data.
         * @param {any} data - The data to "send" as JSON.
         * @returns {any} The data (for compatibility).
         */
        json(data) {
            // Resolve the promise so that the caller can await the result.
            resolveJson(data);
            return data;
        },
        /**
         * Returns the promise that will resolve when json is called.
         * @returns {Promise<any>}
         */
        getResult() {
            return resultPromise;
        }
    };
}


/**
 * Creates an endpoint (Query or Mutation) based on a provided function name,
 * merged input schemas (params, query, body), and a response schema.
 *
 * Options:
 *  - functionName: the name of the endpoint (string)
 *  - params: a Zod object schema for URL parameters
 *  - query: a Zod object schema for query-string parameters
 *  - body: a Zod object schema for the request body
 *  - response: a Zod object schema describing the response shape
 *  - resolver: an async function that implements the endpoint logic; it receives validated input and context
 *  - type: either "query" or "mutation" (default is "query")
 *
 * The merged input will be available under a single GraphQL argument called "input".
 */
function createEndpoint({ endpointPath, pagination, schemas, params, query, body, response, resolver, method, type = QUERY_TYPE }) {
    
    let paginationSchema = null;
    if(pagination) {
        paginationSchema = z.object({
            page: z.number(),
            limit: z.enum(pagination.limits),
        });
    }
    // (Assuming all three are Zod objects; Zod's .merge() works only on ZodObject.)
    const mergedInput = safeMergeSchemas(paginationSchema, params, query, body);

    let postfixName = 'Undefined';

    if (method == 'get') {
        postfixName = 'Query';
    } else if (method == 'post') {
        postfixName = 'Find';
    } else if (method == 'put') {
        postfixName = 'Update';
    } else if (method == 'delete') {
        postfixName = 'Delete';
    }

    let functionName = prepareName(endpointPath, postfixName);

    if (method == 'get') {
        type = QUERY_TYPE;
    } else {
        type = MUTATION_TYPE;
    }

    // Derive names for the generated types.
    const inputTypeName = `${functionName}Input`;
    const responseTypeName = `${functionName}Response`;

    // Generate GraphQL SDL for the input and response.
    // (Replace these calls with your full conversion logic if available.)
    let inputTypeDefs = convertZodSchemaToGraphQLTypes(inputTypeName, mergedInput);
    let responseTypeDefs = convertZodSchemaToGraphQLTypes(responseTypeName, response);

    inputTypeDefs = inputTypeDefs.replace(`type ${inputTypeName} {`, `input ${inputTypeName} {`);

    let input = inputTypeDefs !== '' ? `(input: ${inputTypeName})` : '';
    let fieldDef;
    // Create the field definition.
    // We define a field that takes one non-null "input" argument of the merged type.
    if (type == QUERY_TYPE) {
        let queryPrefix = hasQuery ? 'extend ' : '';
        hasQuery = true;
        fieldDef = `${queryPrefix}type Query { ${functionName}${input}: ${responseTypeName}! }`;
    }

    if (type == MUTATION_TYPE) {
        let mutationPrefix = hasMutation ? 'extend ' : '';
        hasMutation = true;
        fieldDef = `${mutationPrefix}type Mutation { ${functionName}${input}: ${responseTypeName}! }`;
        // console.log(mutationPrefix, hasMutation, fieldDef)
    }


    // Create the resolver function.
    const fieldResolver = async (parent, args, context, info) => {
        // Create a promise that will resolve when res.json is called.
        const res = createRes();

        nexa.logger.info(`Request received: [${method}] ${endpointPath} ${functionName}`);
        
        await UnifiedResponse({
            method,
            originalUrl: endpointPath,
            query: args.input,
            params: args.input,
            body: args.input,
        }, res, schemas, resolver, {

        });

        // Wait for res.json to be called and get its value.
        const result = await res.getResult();

        return result.data;
    };

    // Return the complete typedefs and resolvers mapping.
    return {
        typeDefs: inputTypeDefs + "\n\n" + responseTypeDefs + "\n\n" + fieldDef,
        resolvers: {
            [type === QUERY_TYPE ? "Query" : "Mutation"]: {
                [functionName]: fieldResolver,
            },
        },
    };
}


export const createResolvers = () => {
    resetValues();

    let typeDefs = {}
    let resolvers = {
        Query: {},
        Mutation: {},
    }

    for (let route of NexaRoutes) {
        const { method, path, schemas, handler } = route;

        if (!Array.isArray(schemas)) {
            schemas = [schemas, null];
        }

        const requestSchema = findSchema(schemas?.[0]);
        const responseSchema = findSchema(schemas?.[1]) || findSchema(schemas?.[0]);

        const endpointPath = path.replace(/\//g, '_').replace(/:/g, '').replace(/\?/g, '');

        const { typeDefs: endpointTypeDefs, resolvers: endpointResolvers } = createEndpoint({
            endpointPath,
            schemas: [requestSchema, responseSchema],
            pagination: requestSchema.pagination,
            params: requestSchema.params,
            query: requestSchema.query,
            body: requestSchema.body,
            response: responseSchema.response,
            resolver: handler,
            method,
        });

        typeDefs[`${endpointPath}${method}`] = endpointTypeDefs;

        resolvers = {
            Query: {
                ...resolvers.Query,
                ...endpointResolvers.Query,
            },
            Mutation: {
                ...resolvers.Mutation,
                ...endpointResolvers.Mutation,
            },
        }
    }

    typeDefs = Object.values(typeDefs).join('\n\n');

    return {
        typeDefs,
        resolvers,
    }
}