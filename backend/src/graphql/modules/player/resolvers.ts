import type { EventNames, EventPayload } from 'graphql-subscriptions';
import { withFilter } from 'graphql-subscriptions';
import { flow, overSome } from 'lodash/fp';
import type { Resolvers } from './generated.types';
import { PlayerService } from './service';
import { Events as PlayerEvents, PlayerData } from './types';
import { GameService } from '../game/service';
import { Events as OrderEvents } from '../order/types';
import type { SubscriptionPlayerArgs } from '../generated.schema';
import { PubSub } from '../../PubSub';
import { getFieldSelections, isFieldSelected } from '../../utils';

type Events = PlayerEvents & OrderEvents;

const resolvers: Resolvers = {
  Query: {
    player: async (_, { id }, context) =>
      context.injector.get(PlayerService).getPlayerById(id),
  },
  Mutation: {
    connectPlayer: async (_, { request }, context) =>
      context.injector.get(PlayerService).connectPlayer(request ?? {}),
    setCurrentOrder: async (_, { orderId, playerId }, context) =>
      context.injector.get(PlayerService).setCurrentOrder(playerId, orderId),
  },
  Subscription: {
    player: {
      resolve: async (
        _: EventPayload<Events>,
        { id }: SubscriptionPlayerArgs,
        context: GraphQLModules.Context
      ) => context.injector.get(PlayerService).getPlayerById(id),
      subscribe: withFilter(
        async (_, _args, context, info) =>
          // If any order fields have been queried, listen to order events
          flow(
            getFieldSelections('player'),
            overSome([
              isFieldSelected('currentOrder'),
              isFieldSelected('orders'),
            ]),
            (shouldSubscribeToOrderEvents): ReadonlyArray<keyof OrderEvents> =>
              shouldSubscribeToOrderEvents
                ? ['NEW_ORDER_CREATED', 'ORDER_UPDATED']
                : [],
            (events): EventNames<keyof Events> => ['PLAYER_UPDATED', ...events],
            (triggers) =>
              context.injector.get(PubSub).asyncIterableIterator(triggers)
          )(info.fieldNodes),
        (event: EventPayload<Events>, { id: playerId }) =>
          'player' in event
            ? event.player.id === playerId
            : event.order.playerId === playerId
      ),
    },
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
