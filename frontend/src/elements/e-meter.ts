import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import styles from '../global.css.ts';
import { variable } from '../globals.ts';
import { StoreBase, StoreSubscriptionController } from '../store.ts';

export class EMeter extends LitElement {
  static styles = [styles, css`
		:host {
			display: inline-block;
		}
  `];

	@property({ type: Number }) public value = 0;

  render() {
    return html`
			<div class="base" part="base">
				meter here...
			</div>
    `;
  }
}

customElements.define('e-meter', EMeter);
