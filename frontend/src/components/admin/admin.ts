import { LitElement, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import 'https://unpkg.com/@patternfly/pfe-button?module';

import {
  ApolloQueryController,
  ApolloMutationController,
  ApolloSubscriptionController,
  ReactiveVariableController,
} from '@apollo-elements/core';

import { GameQuery, GameQueryData } from './Admin.query.graphql';
import { SetGameState } from './Admin.mutation.graphql';
import { GameUpdated } from './Admin.subscription.graphql';
import style from './admin.css';
import shared from '../shared.css';
import { locationVar } from '../../router.js';

type Game = GameQueryData['games'];
const gameStates: GameState[] = ['LOBBY', 'TESTING', 'ACTIVE', 'PAUSED', 'STOPPED'];

@customElement('apollo-admin')
export class ApolloApp extends LitElement {
  static readonly is = 'apollo-admin';

  static readonly styles = [shared, style];

  gameQuery = new ApolloQueryController(this, GameQuery);
  setGameStateMutation = new ApolloMutationController(this, SetGameState);
  gameUpdatedSubscription = new ApolloSubscriptionController(this, GameUpdated);
  router = new ReactiveVariableController(this, locationVar);

  render(): TemplateResult {
    const gameId: Game['id'] = this.router?.value?.games?.gameId;

    return html`
      <!-- homepge -->
      ${!gameId ? html`
      	${this.gameQuery?.data?.games.length === 0 ? html`There are no active games` : ''}
        <ul>
        ${this.gameQuery?.data?.games.map(game => html`
          <li><a href="/admin/games/${game.id}">${game.id}</a></li>
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
              <pfe-button ?disabled=${state === this.getGameData(gameId).state}><button @click=${e => this.updateGameState(state)} >${state}</button></pfe-button>
            `)}
          </div>
        </div>
      ` : ''}
    `;
  }

  private getGameData(id: Game['id']): Game {
    return this.gameQuery?.data?.games?.find(game => game.id === id) ?? [];
  }

  private updateGameState(state: Game['state']) {
    this.setGameStateMutation.mutate({
      variables: {
        id: this.router?.value?.games?.gameId,
        state
      }
    })
  }
}
