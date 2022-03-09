import assert from 'assert';
import { filter, first } from 'lodash/fp';
import { Injectable } from 'graphql-modules';
import { nanoid } from 'nanoid';
import type { ConnectionRequest, Player } from './generated.types';
import type { PlayerData } from './types';
import generateUserName from './username.generator';
import { GameService } from '../game/service';
import { GameData } from '../game/types';
import type { Game, Maybe } from '../generated.schema';
import { PubSub } from '../../PubSub';

@Injectable({ global: true })
export class PlayerService {
  private players = new Map<Player['id'], PlayerData>();

  constructor(private pubsub: PubSub, private gameService: GameService) {}

  private get playersArray(): PlayerData[] {
    return Array.from(this.players, ([, player]) => player);
  }

  async getPlayers(gameId: Game['id']): Promise<PlayerData[]> {
    return filter({ gameId }, this.playersArray);
  }

  async getPlayerById(id: Player['id']): Promise<Maybe<PlayerData>> {
    return this.players.get(id) ?? null;
  }

  async createNewPlayer(
    gameId: Game['id'],
    username?: Player['username']
  ): Promise<PlayerData> {
    const player: PlayerData = {
      id: nanoid(),
      username: username ?? generateUserName(),
      gameId,
    };

    this.players.set(player.id, player);

    await this.pubsub.publish('NEW_PLAYER_CREATED', {
      player,
    });

    return player;
  }

  private async getGameForConnectingPlayer(
    gameId?: Maybe<Game['id']>
  ): Promise<Maybe<GameData>> {
    return gameId
      ? await this.gameService.getGameById(gameId)
      : first(await this.gameService.getGames({ state: 'LOBBY' })) ??
          (await this.gameService.createNewGame());
  }

  async connectPlayer({
    gameId,
    playerId,
    username,
  }: ConnectionRequest): Promise<PlayerData> {
    const game = await this.getGameForConnectingPlayer(gameId);

    assert(game, `Can't find game with id: ${gameId}`);

    if (playerId == null && game.state !== 'LOBBY') {
      throw new Error("Game isn't accepting any new players to connect");
    }

    const player = playerId
      ? await this.getPlayerById(playerId)
      : await this.createNewPlayer(game.id, username ?? undefined);

    assert(player, `Can't find player with id: ${playerId}`);

    await this.pubsub.publish('PLAYER_CONNECTED', { player });

    return player;
  }
}
