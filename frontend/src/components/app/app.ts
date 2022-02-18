import { LitElement, html, TemplateResult } from 'lit';
import { ApolloQueryController } from '@apollo-elements/core';
import { customElement } from 'lit/decorators.js';

import { AppQuery } from './App.query.graphql';
import { AppSubscription } from './App.subscription.graphql';

import style from './app.css';
import shared from '../shared.css';

@customElement('apollo-app')
export class ApolloApp extends LitElement {
  static readonly is = 'apollo-app';

  static readonly styles = [shared, style];

  query = new ApolloQueryController(this, AppQuery);

  connectedCallback(): void {
    super.connectedCallback();
    this.query.subscribeToMore({
      document: AppSubscription,
      updateQuery(prev, { subscriptionData }) {
        if (!subscriptionData.data) return prev;
        const { subscription, uuid } = subscriptionData;
        return {
          ...prev,
          uuid,
          state
        };
      },
    })
  }

  render(): TemplateResult {
    console.log(this.query);
    return html`
      <dl>
        <dt>Pathname</dt>
        <dd>${this.query.data?.location?.pathname ?? '/'}</dd>
        <dt>Game Config</dt>
        <dd>${this.query.data?.gameConfig?.uuid}</dd>
        <dd>${this.query.data?.gameConfig?.state}</dd>
      </dl>
    `;
  }
}
