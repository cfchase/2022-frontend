import { LitElement, html, TemplateResult } from 'lit';
import { ApolloQueryController, ApolloMutationController } from '@apollo-elements/core';
import { customElement } from 'lit/decorators.js';

import { GameConfigQuery } from './App.query.graphql.js';
import { ConnectionRequestMutation } from './App.mutation.graphql.js';

import style from './app.css';
import shared from '../shared.css';

export const getLocalStorage = () => {
	return {
    username: localStorage.getItem("username"),
    gameId: localStorage.getItem("gameId"),
    playerId: localStorage.getItem("playerId"),
	};
};

export const updateLocalStorage = (gameId: string, playerId: string, username: string) => {
	localStorage.setItem("username", username);
	localStorage.setItem("gameId", gameId);
	localStorage.setItem("playerId", playerId);
};

@customElement('apollo-app')
export class ApolloApp extends LitElement {
  static readonly is = 'apollo-app';

  static readonly styles = [shared, style];

  gameConfigQuery = new ApolloQueryController(this, GameConfigQuery);
  connectionRequestMutation = new ApolloMutationController(this, ConnectionRequestMutation);

  firstUpdated() {
    this.sendConnectionRequest();
  }

  public async sendConnectionRequest() {
    let storedGameConfig = {};
		// get a previously connected player
		const previousPlayer = getLocalStorage();
		if (previousPlayer.gameId && previousPlayer.playerId && previousPlayer.username) {
			storedGameConfig = previousPlayer;
		}
    const { data, error } = await this.connectionRequestMutation.mutate({ variables: storedGameConfig })
    // store new player and game info
    if (!error) updateLocalStorage(data);
    // update the gameconfigQuery
    this.gameConfigQuery.refetch();
  }

  render(): TemplateResult {
    return html`
      <dl>
        <dt>Pathname</dt>
        <dd>${this.gameConfigQuery.data?.location?.pathname ?? '/'}</dd>
        <dt>Game Config</dt>
        <dd>${this.gameConfigQuery.data?.gameConfig?.uuid}</dd>
        <dd>${this.gameConfigQuery.data?.gameConfig?.cluster}</dd>
        <dd>${this.gameConfigQuery.data?.gameConfig?.state}</dd>
        <dd>${this.gameConfigQuery.data?.gameConfig?.date}</dd>
      </dl>
    `;
  }
}
