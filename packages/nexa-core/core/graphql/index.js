import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import cors from 'cors';
import bodyParser from 'body-parser';
import { httpServer } from '../express.js';
import { createTypeDefs } from './types.js';
import { createResolvers } from './resolvers.js';


export const makeNexaGraphQL = async (app) => {
    const { typeDefs, resolvers } = createResolvers();
    // Set up Apollo Server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();
    app.use(
        cors(),
        bodyParser.json(),
        expressMiddleware(server),
    );
}