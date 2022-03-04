import { Resolvers } from './generated.types';
import { GameProvider } from './provider';
import { PubSub } from '../../PubSub';

const resolvers: Resolvers = {
  Query: {
    gameConfig: async (_parent, _args, context) =>
      context.injector.get(GameProvider).config,
  },
  Mutation: {
    connect: async (_parent, _args, context) =>
      context.injector.get(GameProvider).connect(),
  },
  Subscription: {
    game: {
      subscribe: async (_parent, _args, context) =>
        context.injector.get(PubSub).asyncIterableIterator('GAME_STATE_CHANGE'),
    },
  },
};

export default resolvers;
