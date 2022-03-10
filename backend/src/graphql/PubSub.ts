import { Injectable } from 'graphql-modules';
import { PubSub as BasePubSub } from 'graphql-subscriptions';
import type { Events as GameEvents } from './modules/game/types';
import type { Events as OrderEvents } from './modules/order/types';
import type { Events as PlayerEvents } from './modules/player/types';

export type Events = GameEvents & OrderEvents & PlayerEvents;

@Injectable({ global: true })
export class PubSub extends BasePubSub<Events> {}
