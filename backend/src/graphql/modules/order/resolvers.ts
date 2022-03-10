import type { Resolvers } from './generated.types';
import { OrderService } from './service';
import { PlayerData } from '../player/types';

const resolvers: Resolvers = {
  Mutation: {
    addOrderToQueue: async (_, { playerId }, context) =>
      context.injector.get(OrderService).createNewOrder(playerId),
  },
  Player: {
    currentOrder: async (playerData: Partial<PlayerData>, _args, context) =>
      playerData.currentOrderId
        ? await context.injector
            .get(OrderService)
            .getOrderById(playerData.currentOrderId)
        : null,
    orders: async (playerData: Partial<PlayerData>, _args, context) =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      context.injector.get(OrderService).getOrders(playerData.id!),
  },
};

export default resolvers;
