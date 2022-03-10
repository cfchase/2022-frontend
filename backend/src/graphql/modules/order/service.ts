import { filter } from 'lodash/fp';
import { Injectable } from 'graphql-modules';
import { nanoid } from 'nanoid';
import type { Order } from './generated.types';
import type { OrderData } from './types';
import type { Maybe, Player } from '../generated.schema';
import { PubSub } from '../../PubSub';

@Injectable({ global: true })
export class OrderService {
  private orders = new Map<Order['id'], OrderData>();

  constructor(private pubsub: PubSub) {}

  private get ordersArray(): OrderData[] {
    return Array.from(this.orders, ([, order]) => order);
  }

  async getOrders(playerId: Player['id']): Promise<OrderData[]> {
    return filter({ playerId }, this.ordersArray);
  }

  async getOrderById(id: Order['id']): Promise<Maybe<OrderData>> {
    return this.orders.get(id) ?? null;
  }

  async createNewOrder(playerId: Player['id']): Promise<OrderData> {
    const order: OrderData = {
      id: nanoid(),
      playerId,
      status: 'IN_QUEUE',
      points: 0,
    };

    this.orders.set(order.id, order);

    await this.pubsub.publish('NEW_ORDER_CREATED', {
      order,
    });

    return order;
  }
}
