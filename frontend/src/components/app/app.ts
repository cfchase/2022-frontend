import { LitElement, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import {
  ApolloQueryController,
  ApolloMutationController,
  ApolloSubscriptionController,
} from '@apollo-elements/core';

import { GameConfigQuery } from './App.query.graphql.js';
import { GameConfigUpdated } from './GameConfig.subscription.graphql.js';
import { ConnectionRequestMutation } from './App.mutation.graphql.js';

import style from './app.css';
import shared from '../shared.css';

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

  public async sendConnectionRequest() {
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
      this.gameConfigQuery.refetch();
    } catch (error) {
      console.error(error);
    }
  }

  render(): TemplateResult {
    return html`
      <button @click="${this.sendConnectionRequest}">Connect</button>
      <dl>
        <dt>Pathname</dt>
        <dd>${this.gameConfigQuery.data?.location?.pathname ?? '/'}</dd>
        <dt>Game Config</dt>
        <dd>Cluster: ${this.gameConfigQuery.data?.gameConfig?.cluster}</dd>
        <dd>Date: ${this.gameConfigQuery.data?.gameConfig?.date}</dd>
        <dt>Game</dt>
        <dd>ID: ${this.gameConfigSubscription.data?.game?.id}</dd>
        <dd>State: ${this.gameConfigSubscription.data?.game?.state}</dd>
      </dl>

      <h2>Last Config Update</h2>
      <output>${this.gameConfigSubscription.data?.game?.id}</output>
    `;
  }
}
