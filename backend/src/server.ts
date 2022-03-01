import express from 'express';
import http from 'http';
import path from 'path';

import type { AddressInfo } from 'net';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import { GRAPHQL_ENDPOINT, HTTP_ADDRESS, HTTP_PORT } from './config';
import { healthCheck } from './plugins/health';

import { application } from './graphql';

export default async function startApolloServer() {
  // TODO: replace fastify logging with something appropriate
  const app = express();

  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: GRAPHQL_ENDPOINT,
  });

  wsServer.on('listening', function () {
    const { port, family, address } = wsServer.address() as AddressInfo;
    console.log(
      `🚀 Subscriptions ready at ws://${address}:${port}${GRAPHQL_ENDPOINT} - ${family}`
    );
  });

  app.get('/health', healthCheck(wsServer));
  app.get(GRAPHQL_ENDPOINT, (_, res) => {
    res.sendFile(path.join(__dirname, 'views', 'graphiql', 'index.html'));
  });

  useServer(
    {
      schema: application.schema,
      execute: application.createExecution(),
      subscribe: application.createSubscription(),
      // season to taste...
      onConnect: (ctx) => console.log('Connected', ctx),
      onSubscribe: (ctx, msg) => console.log('Subscribe', { ctx, msg }),
      onNext: (ctx, msg, args, result) =>
        console.debug('Next', { ctx, msg, args, result }),
      onError: (ctx, msg, errors) =>
        console.error('Error', { ctx, msg, errors }),
      onComplete: (ctx, msg) => console.log('Completed!', { ctx, msg }),
      onDisconnect: (ctx, msg, args) =>
        console.log('Disconnected!', ctx, msg, args),
    },
    wsServer
  );

  await new Promise<void>((resolve) =>
    httpServer.listen(HTTP_PORT, HTTP_ADDRESS, resolve)
  );

  console.log(
    `🚀 HTTP Server   ready at http://${HTTP_ADDRESS}:${HTTP_PORT}${GRAPHQL_ENDPOINT}`
  );

  return app;
}
