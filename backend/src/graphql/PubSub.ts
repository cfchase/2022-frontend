import { Injectable } from 'graphql-modules';
import { PubSub as BasePubSub } from 'graphql-subscriptions';
import { Maybe } from './modules/generated.schema';
import { Game } from './modules/game/generated.types';

export type Events = {
  GAME_STATE_CHANGE: {
    game: Maybe<Game>;
  };
};

@Injectable({ global: true })
export class PubSub extends BasePubSub<Events> {}
