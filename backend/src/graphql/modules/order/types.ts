import type { Order } from './generated.types';
import type { Player } from '../generated.schema';

export type Events = {
  NEW_ORDER_CREATED: {
    order: OrderData;
  };
  ORDER_UPDATED: {
    order: OrderData;
  };
};

export type OrderData = Order & {
  playerId: Player['id'];
};
