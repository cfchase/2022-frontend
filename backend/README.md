# GraphQL Game Server for Summit 2022

## About

This module provides a GraphQL endpoint for HTTP/Websocket at `http://0.0.0.0:8080/graphql` and `ws://0.0.0.0:8080/graphql`.  It uses [Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started/) with the [Fastify](https://www.apollographql.com/docs/apollo-server/integrations/middleware/#apollo-server-fastify) plugin.

## Installation

From the repo root run:

```bash
yarn install
```

## Development Mode

Start the backend in development mode:

```bash
yarn run dev
```

Open the GraphQL Playground:

http://0.0.0.0:8080/graphql
