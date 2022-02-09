export enum IncomingMsgType {
  Connection = 'connection',
}

export type WsPayload = {
  type: IncomingMsgType;
  data: unknown;
};

export type ConnectionRequestPayload = {
  username?: string;
  gameId?: string;
  playerId?: string;
};
