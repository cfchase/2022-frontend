import type { Game } from './generated.types';

export type Events = {
  NEW_GAME_CREATED: {
    game: Game;
  };
};

export type GameData = Game;
