import type { Game, Player } from './generated.types';

export type Events = {
  NEW_PLAYER_CREATED: {
    player: PlayerData;
  };
  PLAYER_CONNECTED: {
    player: PlayerData;
  };
};

export type PlayerData = Omit<Player, 'game'> & {
  gameId: Game['id'];
};
