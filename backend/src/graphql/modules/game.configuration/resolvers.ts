import { nanoid } from 'nanoid';
import { PubSub } from 'graphql-subscriptions';
import { GameConfiguration, Resolvers } from './generated.types';
import { Maybe } from '../generated.types';
import { CLUSTER_NAME } from '../../../config';

const pubsub = new PubSub();

let gameConfig: Maybe<GameConfiguration> = null;

const resolvers: Resolvers = {
  Query: {
    gameConfig: async () => gameConfig,
  },
  Mutation: {
    connect: async () => {
      if (gameConfig == null) {
        gameConfig = {
          uuid: nanoid(),
          date: new Date().toJSON(),
          cluster: CLUSTER_NAME,
          state: 'LOBBY',
        } as const;

        pubsub.publish('GAME_STATE_UPDATED', { gameConfig });
      }

      return gameConfig;
    },
  },
  Subscription: {
    gameConfig: {
      resolve: () => gameConfig,
      subscribe: async () => ({
        [Symbol.asyncIterator]() {
          return pubsub.asyncIterator('GAME_STATE_UPDATED');
        }
      })
    }
  },
};

export default resolvers;
