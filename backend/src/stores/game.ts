import delay from 'delay';
import log from '../log';
import GameConfiguration, { GameState } from '../models/game.configuration';
import { sendMessageToAllConnectedPlayers } from '../sockets';
import { OutgoingMsgType } from '../payloads/outgoing';
import {
  CACHE_STORE_GAME_DATA,
  CLUSTER_NAME,
  CACHE_KEY_GAME_DATA,
} from '../config';
import { nanoid } from 'nanoid';

let currentGameConfig: GameConfiguration;

/**
 * Power on self test for game data.
 * This can be used to block application startup.
 */
export async function init(): Promise<void> {
  // TODO: this is a placeholder. Will be replaced by something
  // like infinispan or redis, and  be initialised by an external
  // admin service that manages the "state" field
  const gameData = JSON.stringify({
    uuid: nanoid(),
    date: new Date().toJSON(),
    cluster: CLUSTER_NAME,
    state: GameState.Lobby,
  });

  if (!gameData) {
    log.warn(
      `${CACHE_STORE_GAME_DATA}/${CACHE_KEY_GAME_DATA} was not found in datagrid. retrying initialisation in 5 seconds`
    );

    return delay(5000).then(() => init());
  } else {
    currentGameConfig = GameConfiguration.from(JSON.parse(gameData));
    log.info(
      `${CACHE_STORE_GAME_DATA}/${CACHE_KEY_GAME_DATA} value is: %j`,
      currentGameConfig.toJSON()
    );
  }
}

/**
 * Get the current game configuration object.
 * @returns {GameConfiguration}
 */
export function getGameConfiguration() {
  return currentGameConfig;
}

// async function getGameConfigurationFromCache() {
//   const client = await getClient;
//   const data = await client.get(KEY_GAME_DATA);

//   if (data) {
//     return GameConfiguration.from(JSON.parse(data));
//   } else {
//     throw new Error(
//       `${CACHE_STORE_GAME_DATA}/${KEY_GAME_DATA} was missing!`
//     );
//   }
// }

// export default async function gameConfigurationDatagridEventHandler(
//   client: InfinispanClient,
//   eventType: ClientEvent
// ) {
//   log.debug(`detected game data "${eventType}" event`);
//   if (eventType === 'modify' || eventType === 'create') {
//     const freshGameData = await getGameConfigurationFromCache();
//     const isReset = freshGameData.getUUID() !== currentGameConfig.getUUID();

//     // Replace old stale in-memory config with new data
//     currentGameConfig = freshGameData;

//     if (isReset) {
//       log.info(
//         'a game reset was detected, let players know their session has expired. new state: %j',
//         freshGameData
//       );
//     } else {
//       log.info('changing game state to: %j', freshGameData);
//     }

//     sendMessageToAllConnectedPlayers({
//       type: OutgoingMsgType.GameState,
//       data: {
//         game: freshGameData
//       }
//     });
//   } else {
//     log.error(
//       `detected a "${eventType}" for the game state. this shouldn't happen!`
//     );
//   }
// }
