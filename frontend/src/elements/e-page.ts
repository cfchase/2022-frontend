import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import styles from '../../assets/style/summit-22-style.css.ts';

export class EPage extends LitElement {
  static styles = [styles, css``];

  render() {
    return html`
    <div id="game-wrapper">
        <slot name="header"></slot>
        <slot name="middle"></slot>
        <slot name="footer"></slot>
    </div>
    `;
  }
}

customElements.define('e-page', EPage);
