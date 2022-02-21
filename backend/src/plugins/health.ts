import type { WebSocketServer } from 'ws';
import type { Request, Response } from 'express';

import { uptime } from 'process';
import humanize from 'humanize-duration';
import log from '../log';

// import { createRequire } from 'module'
// const require = createRequire(import.meta.url);

export interface HealthPluginOptions {
  version: string;
}

export function healthCheck(wsServer: WebSocketServer) {
  log.info('installing health middleware');
  return async (_req: Request, res: Response) => {
    // `wsServer` is a reference to the WebSocketServer instance
    const connectedClients = wsServer.clients.size;
    // if ts-node doesn't speak `require`, we'll bump `module` and use `createRequire`
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { version } = require('../../package.json');
    res.json({
      connectedClients,
      status: 'ok',
      uptime: humanize(uptime() * 1000),
      serverTs: new Date().toJSON(),
      version,
    })
  };
}
