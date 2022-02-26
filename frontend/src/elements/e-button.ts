import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import styles from '../global.css.ts';
import { variable } from '../globals.ts';
import { StoreBase, StoreSubscriptionController } from '../store.ts';

export class EButton extends LitElement {
  static styles = [styles, css`
		:host {
			display: inline-block;
		}

		button {
			font-size: 1.2rem;
		}
  `];

	@property({ type: Boolean, reflect: true }) public disabled = false;

  render() {
    return html`
			<div class="base" part="base">
				<button ?disabled=${this.disabled}><slot></slot></button>
			</div>
    `;
  }
}

customElements.define('e-button', EButton);
