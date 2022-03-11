import type { Game } from './generated.types';

export type Events = {
  NEW_GAME_CREATED: {
    game: Game;
  };
  GAME_UPDATED: {
    game: Game;
  }
};

export type GameData = Game;
