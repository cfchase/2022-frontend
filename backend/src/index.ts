require('make-promises-safe');

import startServer from './server';
import log from './log';
import config, { NODE_ENV } from './config';
import { schema } from './graphql';

async function main() {
  log.info(`bootstrapping game server in "${NODE_ENV}" mode`);
  log.trace('server config: %j', config);

  await startServer(schema);
}

main();
