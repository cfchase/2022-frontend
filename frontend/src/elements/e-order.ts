import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import styles from '../global.css.ts';
import { variable } from '../globals.ts';

export class EOrder extends LitElement {
  static styles = [styles, css`
		:host {
			display: inline-block;
		}
  `];

	@property() public title = '';

  render() {
    return html`
			<div class="base" part="base">
				order slip here...
			</div>
    `;
  }
}

customElements.define('e-order', EOrder);
