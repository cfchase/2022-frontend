import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import { state } from "lit/decorators/state.js";
import shared from '../components/shared.css';
import "../elements/e-page";
import "../elements/e-header";

@customElement("p-test")
export class PTest extends LitElement {
  static styles = [shared, css`
    :host {
      display: block;
      height: 100%;
    }

    #menu {
      display: flex;
      flex-wrap: wrap;
    }

    #menu button {
      background: none;
      border: 3px solid white;
      border-radius: 24px;
      color: white;
      text-transform: uppercase;
      width: calc(50% - 32px);
      padding: 64px;
      margin: 16px;
      font-size: 1.5rem;
      font-weight: bold;
      cursor: pointer;
    }
  `];

  @state()
  selected: string = null;

  render() {
    return html`
      <e-page>
        <e-header title="Test Your Equipment" slot="header"></e-header>
        <div slot="middle">
          <div id="menu" ?hidden=${this.selected !== null}>
            <button @click=${() => this.selected = "buttons"}>Buttons</button>
            <button @click=${() => this.selected = "tilt"}>Tilt</button>
            <button @click=${() => this.selected = "heat"}>Heat</button>
            <button @click=${() => this.selected = "light"}>Light</button>
          </div>
          <div ?hidden=${this.selected !== "tilt"}>
            <h2>Tilt</h2>
            <button @click=${this._reset}>Back</button>
          </div>
          <div ?hidden=${this.selected !== "buttons"}>
            <h2>Buttons</h2>
            <button @click=${this._reset}>Back</button>
          </div>
          <div ?hidden=${this.selected !== "heat"}>
            <h2>Heat</h2>
            <button @click=${this._reset}>Back</button>
          </div>
          <div ?hidden=${this.selected !== "light"}>
            <h2>Light</h2>
            <button @click=${this._reset}>Back</button>
          </div>
        </div>
      </e-page>
    `;
  }

  private _reset(e: Event) {
    this.selected = null;
  }
}
