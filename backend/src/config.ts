'use strict';

import { get } from 'env-var';

const config = {
  // Usually is "AWS", "GCP", "Azure", etc.
  CLUSTER_NAME: get('CLUSTER_NAME').required().asString(),

  NODE_ENV: get('NODE_ENV').default('dev').asEnum(['dev', 'prod']),

  LOG_LEVEL: get('LOG_LEVEL').asString(),
  FASTIFY_LOG_ENABLED: get('FASTIFY_LOG_ENABLED').default('false').asBool(),

  // HTTP and WebSocket traffic both use this port
  HTTP_PORT: get('HTTP_PORT').default(8080).asPortNumber(),

  // Key for this data in the cache
  CACHE_STORE_GAME_DATA: 'game',
  CACHE_KEY_GAME_DATA: 'game-data',
  CACHE_PLAYER_DATA_STORE: 'players',

  // Maximum number of connections to use when making http requests to
  // a given origin. This does not affect incoming requests to this server
  MAX_HTTP_AGENT_SOCKETS: get('MAX_HTTP_AGENT_SOCKETS')
    .default(250)
    .asIntPositive(),

  // Reject web socket payloads greater than this many bytes (2KB by default)
  WS_MAX_PAYLOAD: get('WS_MAX_PAYLOAD').default(2048).asIntPositive(),

  // Send a heartbeat to clients every so often to keep connections open
  WS_HEARTBEAT_INTERVAL: get('WS_HEARTBEAT_INTERVAL')
    .default('15000')
    .asIntPositive(),

  // If a player action is not received within this time we close their socket
  // Defaults to 30 minutes. We need sufficient time during demos to chat etc.
  WS_ACTIVITY_TIMEOUT_MS: get('WS_ACTIVITY_TIMEOUT_MS')
    .default(30 * 60 * 1000)
    .asIntPositive(),
};

export = config;
