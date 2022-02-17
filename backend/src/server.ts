/* eslint-disable @typescript-eslint/no-var-requires */

import { ApolloServer } from 'apollo-server-fastify';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { execute, GraphQLSchema, subscribe } from 'graphql';
import { createServer } from 'http';
import fastify, { FastifyInstance } from 'fastify';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import {
  FASTIFY_LOG_ENABLED,
  GRAPHQL_ENDPOINT,
  HTTP_ADDRESS,
  HTTP_PORT,
  NODE_ENV,
  WS_MAX_PAYLOAD,
} from './config';
import { getWsAddressFromServer } from './utils';

// const { version } = require('../package.json');

function ApolloServerPluginDrainSubscriptionServer(
  subscriptionServer: SubscriptionServer
): ApolloServerPlugin {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          subscriptionServer.close();
        },
      };
    },
  };
}

export default async function startServer(
  schema: GraphQLSchema
): Promise<FastifyInstance> {
  const app = fastify({ logger: NODE_ENV === 'dev' || FASTIFY_LOG_ENABLED });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect(
        connectionParams: unknown,
        webSocket: unknown,
        context: unknown
      ) {
        app.log.info('Connected!', connectionParams, webSocket, context);
      },
      onDisconnect(webSocket: unknown, context: unknown) {
        app.log.info('Disconnected!', webSocket, context);
      },
    },
    { server: app.server, path: GRAPHQL_ENDPOINT }
  );

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainSubscriptionServer(subscriptionServer),
      ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
      ApolloServerPluginLandingPageGraphQLPlayground({
        endpoint: GRAPHQL_ENDPOINT,
      }),
    ],
  });

  try {
    await server.start();

    app.register(server.createHandler());
    await app.listen(HTTP_PORT, HTTP_ADDRESS);

    app.log.info(
      `🚀 Server ready at http://${HTTP_ADDRESS}:${HTTP_PORT}${server.graphqlPath}`
    );

    return app;
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}
