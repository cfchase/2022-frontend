import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import shared from '../components/shared.css';

@customElement("p-lobby")
export class PTest extends LitElement {
  static styles = [shared, css`
    :host {
      display: block;
      height: 100%;
    }
  `];

  render() {
    return html`
      <div class="full-height bullseye">
        <h1>Lobby</h1>
      </div>
    `;
  }
}
