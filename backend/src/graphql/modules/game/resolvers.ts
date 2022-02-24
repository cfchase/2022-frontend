import { nanoid } from 'nanoid';
import { PubSub } from 'graphql-subscriptions';
import { Game, GameConfiguration, Resolvers } from './generated.types';
import { Maybe } from '../generated.types';
import { CLUSTER_NAME } from '../../../config';

type Events = {
  GAME_STATE_CHANGE: {
    game: Maybe<Game>;
  };
};

const pubsub = new PubSub<Events>();

let gameConfig: GameConfiguration = {
  date: new Date().toJSON(),
  cluster: CLUSTER_NAME,
};

const resolvers: Resolvers = {
  Query: {
    gameConfig: async () => gameConfig,
  },
  Mutation: {
    connect: async () => {
      if (gameConfig.game == null) {
        gameConfig = {
          ...gameConfig,
          game: {
            id: nanoid(),
            state: 'LOBBY',
          },
        };

        pubsub.publish('GAME_STATE_CHANGE', { game: gameConfig.game ?? null });
      }

      return gameConfig;
    },
  },
  Subscription: {
    game: {
      resolve: () => gameConfig.game ?? null,
      subscribe: async () => pubsub.asyncIterableIterator('GAME_STATE_CHANGE'),
    },
  },
};

export default resolvers;
