/* eslint-disable @typescript-eslint/no-var-requires */

import Ajv from 'ajv';
import { IncomingMsgType } from '../incoming';
import { OutgoingMsgType } from '../outgoing';
import stringify from 'fast-json-stringify';

import incoming_payload = require('./incoming.payload.json');
import incoming_connection = require('./incoming.connection.json');

import outgoing_heartbeat from './outgoing.heartbeat';
import outgoing_configuration from './outgoing.configuration';

const _ajv = new Ajv({
  removeAdditional: true,
  useDefaults: true,
});

export const validators = {
  validatePayload: _ajv.compile(incoming_payload),
  [IncomingMsgType.Connection]: _ajv.compile(incoming_connection),
};

type FastSerialisers = {
  [key in OutgoingMsgType]: (doc: unknown) => string;
};

export const stringifiers = {
  [OutgoingMsgType.Heartbeat]: stringify(outgoing_heartbeat as any),
  [OutgoingMsgType.Configuration]: stringify(outgoing_configuration as any),
} as FastSerialisers;

export const ajv = _ajv;
