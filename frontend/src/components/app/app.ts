import { LitElement, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import {
  ApolloQueryController,
  ApolloMutationController,
  ApolloSubscriptionController,
} from '@apollo-elements/core';

import { GameConfigQuery } from './App.query.graphql';
import { GameConfigUpdated } from './GameConfig.subscription.graphql';
import { ConnectionRequestMutation } from './App.mutation.graphql';

import style from './app.css';
import shared from '../shared.css';

import '../../elements/index';

export const getLocalStorage = () => {
  return {
    username: localStorage.getItem('username'),
    gameId: localStorage.getItem('gameId'),
    playerId: localStorage.getItem('playerId'),
  };
};

export const updateLocalStorage = (gameId: string, playerId: string, username: string) => {
  localStorage.setItem('username', username);
  localStorage.setItem('gameId', gameId);
  localStorage.setItem('playerId', playerId);
};

@customElement('apollo-app')
export class ApolloApp extends LitElement {
  static readonly is = 'apollo-app';

  static readonly styles = [shared, style];

  gameConfigQuery = new ApolloQueryController(this, GameConfigQuery);
  connectionRequestMutation = new ApolloMutationController(this, ConnectionRequestMutation);
  gameConfigSubscription = new ApolloSubscriptionController(this, GameConfigUpdated);

  private _connectionRequestInterval: typeof setInterval;

  public async sendConnectionRequest(): void {
    let storedGameConfig = {};
    // get a previously connected player
    const previousPlayer = getLocalStorage();
    if (previousPlayer.gameId && previousPlayer.playerId && previousPlayer.username)
      storedGameConfig = previousPlayer;

    try {
      const { data } =
        await this.connectionRequestMutation.mutate({ variables: storedGameConfig });
      // store new player and game info
      updateLocalStorage(data.connect.game.id, 'unknown playerID', 'unknown username');
      // update the gameConfigQuery
      this.gameConfigQuery.executeQuery();
    } catch (error) {
    }
  }

  firstUpdated(): void {
    // Set up an interval to continuously try to check if the endpoint is up
    this._connectionRequestInterval = setInterval(() => {
      // if we don't have any game data then we need to get some
      if (!this.gameConfigQuery.data?.gameConfig) {
        this.sendConnectionRequest()
      }
      else {
        clearInterval(this._connectionRequestInterval);
      }
    }, 5000);
  }

  render(): TemplateResult {
    return html`
    	${!this.gameConfigQuery.data?.gameConfig ? html`
        <h1 slot="middle">Connecting :)</h1>
      `: html`
        <e-page>
          <e-header title="Snazzy Mushroom" slot="header"></e-header>
          <e-bike-assembly slot="middle"></e-bike-assembly>
          <e-footer slot="footer" timer="55"></e-footer>
        </e-page>
      `}
    `;
  }
}
