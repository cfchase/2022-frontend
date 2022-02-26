import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { variable } from '../globals.ts';
import styles from '../global.css.ts';

export class EPage extends LitElement {
  static styles = [styles, css`
    :host {
      display: flex;
      min-height: calc(100vh - calc(${variable('navHeight')} * 2));
      width: 100vw;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .header {
      font-size: 1.2rem;
      text-align: center;
    }
    .content {
      text-align: center;
    }
    .footer {
      text-align: center;
    }
  `];

  render() {
    return html`
			<div class="base" part="base">
        <div class="header" part="header">
          <slot name="header"></slot>
        </div>
        <div class="content" part="content">
          <slot></slot>
        </div>
        <div class="footer" part="footer">
          <slot name="footer"></slot>
        </div>
			</div>
    `;
  }
}

customElements.define('e-page', EPage);
