import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import styles from "../../../assets/style/summit-22-style.css.ts";

@customElement("p-gameover")
export class PGameOver extends LitElement {
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
      <h1>Game Over</h1>
    `;
  }
}
