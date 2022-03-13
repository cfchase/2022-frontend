import { LitElement, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import 'https://unpkg.com/@patternfly/pfe-button?module';

import {
  ApolloQueryController,
  ApolloMutationController,
  ApolloSubscriptionController,
  ReactiveVariableController,
} from '@apollo-elements/core';

import { GameQuery, GameQueryData } from './App.query.graphql';
import style from './app.css';
import shared from '../shared.css';
import { locationVar } from '../../router.js';

type Game = GameQueryData['games'];
const gameStates: GameState[] = ['ACTIVE', 'LOBBY', 'PAUSED', 'STOPPED', 'TESTING'];

@customElement('apollo-app')
export class ApolloApp extends LitElement {
  static readonly is = 'apollo-app';

  static readonly styles = [shared, style];

  gameQuery = new ApolloQueryController(this, GameQuery);
  router = new ReactiveVariableController(this, locationVar);

  render(): TemplateResult {
    const gameId: Game['id'] = this.router?.value?.groups?.gameId;

    return html`
      <!-- homepge -->
      ${!this.router?.value?.groups ? html`
        <ul>
        ${this.gameQuery?.data?.games.map(game => html`
          <li><a href="/games/${game.id}">${game.id}</a></li>
        `)}
        </ul>
      ` : ''}

      <!-- games page -->
      ${gameId ? html`
      	<div id="game">
          <h1>Game ${gameId}:</h1>
          <div class="players">
            # Players: ${this.getGameData(gameId)?.players?.length}
          </div>
          <div class="game-states">
            ${gameStates.map(state => html`
              <pfe-button @click=${e => console.log(e)} ?disabled=${state === this.getGameData(gameId).state}><button>${state}</button></pfe-button>
            `)}
          </div>
        </div>
      ` : ''}
    `;
  }

  private getGameData(id: Game['id']): Game {
    return this.gameQuery?.data?.games?.find(game => game.id === id) ?? [];
  }

  private updateGameState(id: Game['id'], state: Game['state']) {
    console.log(id, state);
  }
}
