import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import styles from "../../../assets/style/summit-22-style.css.ts";

@customElement("p-splash")
export class PSplash extends LitElement {
  static styles = [styles, css`
    :host {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `];

  render() {
    return html`
      <h1>Bike Factory</h1>
    `;
  }
}
