export enum OutgoingMsgType {
  ServerError = 'server-error',
  BadMessageType = 'bad-message-type',
  BadPayload = 'invalid-payload',
  Heartbeat = 'heartbeat',
  Configuration = 'configuration',
  PleaseWait = 'please-wait',
  GameState = 'game-state',
  ScoreUpdate = 'score-update',
}

export type ValidationErrorPayload = {
  info: string;
};
