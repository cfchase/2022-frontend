import type { Resolvers } from './generated.types';
import { PlayerService } from './service';
import { GameService } from '../game/service';
import { PlayerData } from './types';

const resolvers: Resolvers = {
  Query: {
    player: async (_, { id }, context) =>
      context.injector.get(PlayerService).getPlayerById(id),
  },
  Mutation: {
    connectPlayer: async (_, { request }, context) =>
      context.injector.get(PlayerService).connectPlayer(request ?? {}),
  },
  Game: {
    players: async (gameData, _args, context) =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      context.injector.get(PlayerService).getPlayers(gameData.id!),
  },
  Player: {
    game: async (playerData: Partial<PlayerData>, _args, context) =>
      /* eslint-disable @typescript-eslint/no-non-null-assertion */
      (await context.injector
        .get(GameService)
        .getGameById(playerData.gameId!))!,
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  },
};

export default resolvers;
