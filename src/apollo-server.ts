import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { loadSchema } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";

import { Application } from "express";
import { Server } from "http";
import path from "path";
import cors from "cors";
import { json } from "body-parser";

import { resolvers } from "./resolvers";
import db from "./db.json";

export interface MyContext {
    token?: string;
}

export async function CreateApolloServer(app: Application, httpServer: Server, port: number) : Promise<ApolloServer<MyContext>> {
    const schema = await loadSchema(path.join(__dirname, 'schema.graphql'), { loaders: [new GraphQLFileLoader()] });
    const server = new ApolloServer<MyContext>({
        schema: addResolversToSchema({ schema, resolvers }),
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer })
        ]
    });

    await server.start();

    app.use(
        '/gql',
        cors<cors.CorsRequest>(),
        json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ token: req.headers.token, dataSources: { db } }),
        })
    );

    return new Promise((resolve) => httpServer.listen({ port }, () => { resolve(server) }));
}