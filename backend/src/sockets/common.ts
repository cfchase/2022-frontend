import log from '../log';
import Player from '../models/player';
import { OutgoingMsgType } from '../payloads/outgoing';
import { getGameConfiguration } from '../stores/game';
import { getPlayerWithUUID } from '../stores/players';
import PlayerSocketDataContainer from './player.socket.container';

/**
 * Each response back to a client contains a "type"
 * and a "data" payload.
 */
export type MessageHandlerResponse<T = unknown> = {
  type: OutgoingMsgType;
  data: T;
};

/**
 * Each incoming message is processed by a MessageHandler for the given
 * message "type". An error is returned if "type" is not recognised.
 */
export type MessageHandler<IncomingType, ResponseType> = (
  ws: PlayerSocketDataContainer,
  data: IncomingType
) => Promise<MessageHandlerResponse<ResponseType>>;

/**
 * Poorly named function that will return everything that's required to process
 * most messages and game logic for a given player
 * @param {Player} player
 */
export async function getPlayerSpecificData(player: Player) {
  const playerUUID = player.getUUID();

  log.debug(`fetching game data for player ${playerUUID}`);

  const game = getGameConfiguration();

  const playerData = await getPlayerWithUUID(player.getUUID());

  if (!playerData) {
    throw new Error(`failed to read data for player ${player.getUUID()}`);
  }

  return {
    player: playerData,
    game,
  };
}
