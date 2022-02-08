import { CACHE_PLAYER_DATA_STORE } from '../../config';
import Player, { PlayerData } from '../../models/player';
import log from '../../log';
import generateUserName from './username.generator';
import { nanoid } from 'nanoid';
import { ConnectionRequestPayload } from '../../payloads/incoming';
import { getGameConfiguration } from '../../stores/game';

// TODO: replace with infinispan or similar
const cache: { [key: string]: PlayerData } = {};

/**
 * Initialises a Player entity based on an incoming "connection" event
 */
export async function initialisePlayer(data: ConnectionRequestPayload) {
  log.debug('client connected with connection payload: %j', data);

  const game = getGameConfiguration();

  if (data.playerId) {
    log.debug(
      `player "${data.playerId}" is trying to reconnect for game "${
        data.gameId
      }", and current game is "${game.getUUID()}"`
    );
  }

  if (game.getUUID() === data.gameId) {
    log.debug(`reading player ${data.playerId} for reconnect`);
    const player = data.playerId
      ? await getPlayerWithUUID(data.playerId)
      : undefined;

    if (
      !player ||
      player.getUsername() !== data.username ||
      game.getUUID() !== data.gameId
    ) {
      // First time this client is connecting, or they provided stale lookup data
      // we compare the usernames as an extra layer of protection, though UUIDs
      // should be enough realistically...
      log.trace(
        `player ${data.playerId} attempted reconnect for game ${data.gameId}, but failed. assigning them a new identity. comparison was: %j`,
        {
          incoming: {
            gameId: data.gameId,
            username: data.playerId,
          },
          server: {
            gameId: game.getUUID(),
            username: player?.getUsername(),
          },
        }
      );
      return setupNewPlayer(data);
    } else {
      log.debug('retrieved existing player: %j', player.toJSON());

      return player;
    }
  } else {
    log.debug(
      'setting up connection attempt with data %j as a new player',
      data
    );
    return setupNewPlayer(data);
  }
}

async function setupNewPlayer(data: ConnectionRequestPayload) {
  const newPlayerData = generateNewPlayerData();

  log.debug('setting up new player: %j', newPlayerData);

  const player = new Player({
    ...newPlayerData,
  });

  await upsertPlayerInCache(player);

  return player;
}

/**
 * Returns an instance of a Player from the cache, or undefined if the player
 * was not found in the cache
 * @param uuid
 */
export async function getPlayerWithUUID(
  uuid: string
): Promise<Player | undefined> {
  log.trace(`reading data for player ${uuid}`);

  // TODO: wire remote cache such as redis or infinispan
  // const client = await getCacheClient;
  // const data = await client.get(uuid);

  const data = cache[uuid];

  if (data) {
    try {
      // TODO: parse string returned from remote cache
      // return Player.from(JSON.parse(data));

      return Player.from(data);
    } catch {
      log.warn(
        `found player data for "${uuid}", but failed to parse to JSON: %j`,
        data
      );
      return undefined;
    }
  } else {
    return undefined;
  }
}

/**
 * Insert/Update the player entry in the cache
 * @param player
 */
export async function upsertPlayerInCache(player: Player) {
  const data = player.toJSON();

  log.trace(`writing player to cache: %j`, data);

  // TODO: replace with write to cache
  cache[player.getUUID()] = data;

  return;
}

/**
 * Creates a new player.
 * TODO: verify that the generated username has not been used yet
 */
export function generateNewPlayerData() {
  const username = generateUserName();
  const uuid = nanoid();

  return { username, uuid };
}
