import { filter } from 'lodash/fp';
import { Injectable } from 'graphql-modules';
import { nanoid } from 'nanoid';
import type { Game, GameFilter } from './generated.types';
import type { GameData } from './types';
import type { Maybe } from '../generated.schema';
import { PubSub } from '../../PubSub';

@Injectable({ global: true })
export class GameService {
  private games = new Map<Game['id'], GameData>();

  constructor(private pubsub: PubSub) {}

  private get gamesArray(): GameData[] {
    return Array.from(this.games, ([, game]) => game);
  }

  async getGames({ state }: GameFilter = {}): Promise<GameData[]> {
    return state ? filter({ state }, this.gamesArray) : this.gamesArray;
  }

  async getGameById(id: Game['id']): Promise<Maybe<GameData>> {
    return this.games.get(id) ?? null;
  }

  async createNewGame(): Promise<GameData> {
    const game: GameData = {
      id: nanoid(),
      state: 'LOBBY',
    };

    this.games.set(game.id, game);

    await this.pubsub.publish('NEW_GAME_CREATED', {
      game,
    });

    return game;
  }

  async setGameState(state: Game['state']): Promise<GameData[]> {
    let games = await this.games;

    for await (let [id, game] of games) {
      const updatedGame = { ...game, state };
      this.games.set(id, updatedGame)

      await this.pubsub.publish('GAME_UPDATED', {
        game: updatedGame,
      });
    }

    return this.getGames();
  }
}
