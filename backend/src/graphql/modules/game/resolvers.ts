import type { EventPayload } from 'graphql-subscriptions';
import type { Resolvers } from './generated.types';
import { GameService } from './service';
import type { Events } from './types';
import type { RequireFields, SubscriptionGameArgs } from '../generated.schema';
import { PubSub } from '../../PubSub';

const resolvers: Resolvers = {
  Query: {
    games: async (_, { filter }, context) =>
      context.injector.get(GameService).getGames(filter ?? {}),
  },
  Subscription: {
    game: {
      resolve: async (
        _: EventPayload<Events>,
        { id }: RequireFields<SubscriptionGameArgs, 'id'>,
        context: GraphQLModules.Context
      ) => context.injector.get(GameService).getGameById(id),
      subscribe: async (_, _args, context) =>
        context.injector
          .get(PubSub)
          .asyncIterableIterator([
            'NEW_GAME_CREATED',
            'PLAYER_CONNECTED',
            'PLAYER_UPDATED',
          ]),
    },
  },
};

export default resolvers;
