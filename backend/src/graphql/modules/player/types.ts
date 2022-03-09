import type { Player } from './generated.types';
import type { Game, Order } from '../generated.schema';

export type Events = {
  NEW_PLAYER_CREATED: {
    player: PlayerData;
  };
  PLAYER_CONNECTED: {
    player: PlayerData;
  };
  PLAYER_UPDATED: {
    player: PlayerData;
  };
};

export type PlayerData = Omit<Player, 'game'> & {
  gameId: Game['id'];
  currentOrderId?: Order['id'];
};
