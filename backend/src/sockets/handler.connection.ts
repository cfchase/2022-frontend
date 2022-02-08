import log from '../log';
import PlayerConfiguration, {
  PlayerConfigurationData,
} from '../models/player.configuration';
import * as players from '../stores/players';
import { OutgoingMsgType } from '../payloads/outgoing';
import { ConnectionRequestPayload } from '../payloads/incoming';
import { MessageHandler } from './common';
import { getPlayerSpecificData } from './common';
import { getSocketDataContainerByPlayerUUID } from './player.sockets';
import PlayerSocketDataContainer from './player.socket.container';

const connectionHandler: MessageHandler<
  ConnectionRequestPayload,
  PlayerConfigurationData
> = async (
  container: PlayerSocketDataContainer,
  data: ConnectionRequestPayload
) => {
  log.debug('processing connection payload: %j', data);

  // This will either return an existing player, or create a new one. If the
  // given data param contains valid "uuid" and "username" strings then a
  // existing player is returned, otherwise a new player is created.
  const basePlayer = await players.initialisePlayer(data);

  const { game, player } = await getPlayerSpecificData(basePlayer);

  if (data.playerId === player.getUUID()) {
    // If the player successfully reconnected, then we need to ensure their
    // previous socket is closed to prevent any funny business or odd
    // behaviour. The previous socket can be found closed their playerId
    log.debug(
      `player ${data.playerId} connected with existing ID. removing previous socket from pool if it exists`
    );
    getSocketDataContainerByPlayerUUID(data.playerId)?.close();
  }

  // Important! Associate the Player object with the socket container. This is
  // used for lookups to notify the player of game/match events!
  container.setPlayer(basePlayer);

  return {
    type: OutgoingMsgType.Configuration,
    data: new PlayerConfiguration(game, player).toJSON(),
  };
};

export default connectionHandler;
