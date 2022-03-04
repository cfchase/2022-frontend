import { nanoid } from 'nanoid';
import { Injectable } from 'graphql-modules';
import { GameConfiguration } from './generated.types';
import { PubSub } from '../../PubSub';
import { CLUSTER_NAME } from '../../../config';

let gameConfig: GameConfiguration = {
  date: new Date().toJSON(),
  cluster: CLUSTER_NAME,
};

@Injectable()
export class GameProvider {
  constructor(private pubsub: PubSub) {}

  get config() {
    return gameConfig;
  }

  async connect() {
    if (gameConfig.game == null) {
      gameConfig = {
        ...gameConfig,
        game: {
          id: nanoid(),
          state: 'LOBBY',
        },
      };

      console.log('this.pubsub:', this.pubsub);

      this.pubsub.publish('GAME_STATE_CHANGE', {
        game: gameConfig.game ?? null,
      });
    }

    return gameConfig;
  }
}
