import { CLUSTER_NAME, CACHE_KEY_GAME_DATA } from '../config';
import Model from './model';

export type GameConfigurationData = {
  uuid: string;
  date: string;
  state: GameState;
  cluster: string;
};

export enum GameState {
  Lobby = 'lobby',
  Active = 'active',
  Paused = 'paused',
  Stopped = 'stopped',
}

export default class GameConfiguration extends Model<GameConfigurationData> {
  constructor(id: string, private date: string, private state: GameState) {
    super(id);
  }

  static from(data: GameConfigurationData) {
    return new GameConfiguration(data.uuid, data.date, data.state);
  }

  isInState(state: GameState) {
    return this.state === state;
  }

  getGameState() {
    return this.state;
  }

  getModelKey() {
    return CACHE_KEY_GAME_DATA;
  }

  toJSON(): GameConfigurationData {
    return {
      cluster: CLUSTER_NAME,
      uuid: this.getUUID(),
      date: this.date,
      state: this.state,
    };
  }
}
