import Model from './model';
import log from '../log';

export type PlayerData = {
  username: string;
  uuid: string;
};

export default class Player extends Model<PlayerData> {
  private username: string;

  constructor(opts: { username: string; uuid?: string }) {
    super(opts.uuid);

    this.username = opts.username;
  }

  static from(data: PlayerData) {
    log.trace('creating player instance from data: %j', data);
    return new Player(data);
  }

  getUsername() {
    return this.username;
  }

  /**
   * Returns a JSON object that is used to serialise this Player instance for
   * storage in the infinispan cache, or to be sent via WebSocket
   */
  toJSON(): PlayerData {
    return {
      username: this.username,
      uuid: this.getUUID(),
    };
  }
}
