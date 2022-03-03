import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import styles from '../global.css.ts';
import { variable } from '../globals.ts';
import { StoreBase, StoreSubscriptionController } from '../store.ts';

export class EProgressBar extends LitElement {
  static styles = [styles, css`
		:host {
			display: inline-block;
		}
  `];

  render() {
    return html`
			<div class="base" part="base">
			</div>
    `;
  }
}

customElements.define('e-progress-bar', EProgressBar);
