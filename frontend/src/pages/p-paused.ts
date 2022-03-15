import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import styles from "../../assets/style/summit-22-style.css.ts";
import '../elements/index';

@customElement("p-paused")
export class PSplash extends LitElement {
  static styles = [styles, css`
    :host {
    }
  `];

  render() {
    return html`
      <e-page>
        <e-header title="Game Paused" slot="header"></e-header>
      </e-page>
    `;
  }
}
