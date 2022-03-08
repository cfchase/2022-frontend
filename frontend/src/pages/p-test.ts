import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import styles from "../../../assets/style/summit-22-style.css.ts";
import "../elements/e-page";

@customElement("p-test")
export class PTest extends LitElement {
  static styles = [styles, css`
    :host {
      display: block;
    }
  `];

  render() {
    return html`
      <e-page>
        <h1>Test your equipment</h1>
      </e-page>
    `;
  }
}
