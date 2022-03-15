import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import styles from "../../../assets/style/summit-22-style.css.ts";

@customElement("p-splash")
export class PSplash extends LitElement {
  static styles = [styles, css`
    :host {
    }
  `];

  render() {
    return html`
      <e-page>
        <e-header title="Connecting" slot="header"></e-header>
      </e-page>
    `;
  }
}
