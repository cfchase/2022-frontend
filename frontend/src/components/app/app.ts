import { LitElement, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import {
  ApolloQueryController,
  ApolloMutationController,
  ApolloSubscriptionController,
  ReactiveVariableController,
} from '@apollo-elements/core';

import { GameQuery } from './App.query.graphql';
import { ConnectionRequestMutation } from './App.mutation.graphql';
import {
  GameUpdated,
  GameUpdatedSubscriptionData,
} from './App.subscription.graphql.js';

import { locationVar } from '../../router.js';

import style from './app.css';
import shared from '../shared.css';

import '../../elements/index';
import '../../pages/index';
import '../admin/index';

type Game = GameUpdatedSubscriptionData['game'];
type StorageData = ReturnType<typeof getLocalStorage>;

export const getLocalStorage = () => {
  return {
    username: localStorage.getItem('username'),
    gameId: localStorage.getItem('gameId'),
    playerId: localStorage.getItem('playerId'),
  };
};

export const updateLocalStorage = (
  gameId: string,
  playerId: string,
  username: string
) => {
  localStorage.setItem('username', username);
  localStorage.setItem('gameId', gameId);
  localStorage.setItem('playerId', playerId);
};

export const clearLocalStorage = () => {
  localStorage.removeItem('username');
  localStorage.removeItem('gameId');
  localStorage.removeItem('playerId');
};

@customElement('apollo-app')
export class ApolloApp extends LitElement {
  static readonly is = 'apollo-app';

  static readonly styles = [shared, style];

  router = new ReactiveVariableController(this, locationVar);

  @state()
  protected _game: Game;

  gameQuery = new ApolloQueryController(this, GameQuery);

  connectionRequestMutation = new ApolloMutationController(
    this,
    ConnectionRequestMutation
  );

  gameSubscription = new ApolloSubscriptionController(this, GameUpdated, {
    noAutoSubscribe: true,
    onData: ({ subscriptionData: { data } }) => {
      this._game = data.game;
    },
  });

  private _connectionRequestInterval: ReturnType<typeof setInterval>;

  public async sendConnectionRequest(): Promise<void> {
    let storedGameConfig: Partial<StorageData> = {};
    // get a previously connected player
    const previousPlayer = getLocalStorage();
    if (
      previousPlayer.gameId &&
      previousPlayer.playerId &&
      previousPlayer.username
    )
      storedGameConfig = previousPlayer;

    try {
      const { data } = await this.connectionRequestMutation.mutate({
        variables: {
          connectionRequest: storedGameConfig,
        },
      });

      // store new player and game info
      updateLocalStorage(
        data.connectPlayer.game.id,
        data.connectPlayer.id,
        data.connectPlayer.username
      );

      this._game = data.connectPlayer.game;

      await this.gameSubscription.subscribe({
        variables: { gameId: this._game.id },
      });
    } catch (error) {
      // reset player and game info
      clearLocalStorage();
    }
  }

  firstUpdated(): void {
    // Set up an interval to continuously try to check if the endpoint is up
    this._connectionRequestInterval = setInterval(() => {
      // if we don't have any game data then we need to get some
      if (!this._game) this.sendConnectionRequest();
      else clearInterval(this._connectionRequestInterval);
    }, 5000);
  }

  render(): TemplateResult {
    const isAdmin = !!this.router?.value?.admin;
    return html`
    	${!isAdmin ? html`
        ${!this._game ?
          html`
            <div class="full-height bullseye">
              <h1>Connecting...</h1>
            </div>
          `
          : html`
              ${this._game.state === "LOBBY" ? html` <p-lobby></p-lobby>` : ''}
              ${this._game.state === "TESTING" ? html` <p-test></p-test>` : ''}
            `}
      ` : html`
          <apollo-admin></apollo-admin>
      `}
    `;
  }
}
