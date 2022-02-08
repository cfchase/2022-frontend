require('make-promises-safe');

import startServer from './server';
import log from './log';
import * as game from './stores/game';
import { heartbeat } from './sockets';
import config, { NODE_ENV } from './config';

async function main() {
  log.info(`bootstrapping game server in "${NODE_ENV}" mode`);
  log.trace('server config: %j', config);

  await game.init();
  await startServer();

  heartbeat();
}

main();
