import { LitElement, html, css } from 'lit';
import { svg, unsafeStatic } from 'lit/static-html.js';
import { property, state } from 'lit/decorators.js';
import { variable } from '../globals.ts';
import styles from '../../assets/style/summit-22-style.css';

export class EFooter extends LitElement {
  static styles = [styles, css`
    :host {
      display: block;
    }
  `];

  @property({ type: Number }) timer = 55;

  render() {
    return html`
      <footer id="footer-wrapper">
        ${svg`
          <svg version="1.1" id="footerBanner" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 420 100" style="enable-background:new 0 0 420 100" xml:space="preserve"><style>.textBlock1{enable-background:new}.textColor{fill:#fff}</style><g id="footerBackground"><path d="M419.7 100.2V14.1h-.1c-.3-2.2-2.2-3.9-4.5-3.9-2.4 0-4.3-2.2-4.3-4.5v-.6c0-2.5-2-4.5-4.5-4.5H13c-2.5 0-4.5 2-4.5 4.5v.2c0 2.7-2.1 4.7-4.8 4.9-2.1.1-3.8 1.8-4 3.9v86.2l420-.1z" style="fill:#d2e2e9"/><path style="fill:#b6d2df" d="M-.3 60.2h420v40.1H-.3z"/></g>
            <a @click=${this._nextSetHandler} xlink:href="#" alt="View orders"><g id="nextButton">
            <path id="buttonShade" d="M380.5 81.1s.4 2-85.9 2-82.2-2-82.2-2c-6.6 0-11.9-5.4-11.9-11.9l-1-31.2c0-6.6 5.4-11.9 11.9-11.9 0 0-6.5-2 84.3-2s85.8 2 85.8 2c6.6 0 11.9 5.4 11.9 11.9l-1 31.2c0 6.5-5.3 11.9-11.9 11.9z" style="fill:#acc2cb"/><path id="buttonDark" d="m388.5 39.6-.4 12.3-.5 15.5c.1 5.9-4.7 10.7-10.6 10.7 0 0-4.3 1.8-81.4 1.8s-79.8-1.8-79.8-1.8c-5.9 0-10.7-4.8-10.7-10.7l-.5-15.5-.4-12.3c0-5.9 4.8-10.7 10.7-10.7 0 0 .6-1.8 81.7-1.8s81.2 1.8 81.2 1.8c5.9 0 10.7 4.8 10.7 10.7z" style="fill:#fca249"/><path id="buttonLight" d="m388.1 51.9-.5 15.5c.1 5.9-4.7 10.7-10.6 10.7 0 0-4.3 1.8-81.4 1.8s-79.8-1.8-79.8-1.8c-5.9 0-10.7-4.8-10.7-10.7l-.5-15.5h183.5z" style="fill:#fdce9d"/><path id="buttonMain" d="M373.6 74.5s-6.8 1.6-77.9 1.6-75.6-1.6-75.6-1.6c-5.4 0-9.8-4.4-9.8-9.8l-.8-23c0-5.4 4.4-9.8 9.8-9.8 0 0 2.6-1.6 77.3-1.6s77.8 1.6 77.8 1.6c5.4 0 9.8 4.4 9.8 9.8l-.8 23c0 5.3-4.4 9.8-9.8 9.8z" style="fill:#fdb866"/><g id="nextText" class="textBlock1"><path class="textColor" d="m249.5 59.7-.9-.2c-1.4-2.4-3.1-5-4.7-7.4-.4-.5-.8-1.4-.9-1.4v9h-4V44h3.5c1.5 1.9 3.1 4.2 4.6 6.5.4.6.7 1.2.9 1.4V44h4v15.8h-2.5zM255.7 59.7V44h9.7v3.4h-5.3v2.7h4.6v3.3h-4.6v2.9h5.5v3.4h-9.9zM278.4 59.7c-.4-.1-.7-.1-1-.2-.6-1.4-1.4-3-2.2-4.5-.8 1.4-1.8 3.4-2.4 4.6h-4.7c1.5-2.8 3-5.4 4.7-8.1-1.4-2.4-3.1-5.3-4.4-7.7h4.9l2.1 4.1c.7-1.4 1.5-2.8 2.2-4.1h4.6l-4.5 7.4c1.8 2.9 3.4 5.8 4.7 8.4h-4zM291.1 47.4v12.4h-4.4V47.4h-3.5V44h11.4v3.4h-3.5zM308.2 60c-2.4 0-4-.6-5-1.2.4-1.1.7-2.2 1.1-3.3.8.5 2 1 3.4 1 1.3 0 1.8-.5 1.8-1.2 0-.9-.8-1.3-2.9-2.1-2-.9-3.1-2.3-3.1-4.2 0-.4 0-.8.1-1.2.4-2.3 2.5-3.9 5.5-3.9 1.9 0 3.5.5 4.5 1.1l-1.1 3.1c-.8-.4-1.8-.8-2.9-.8-1.1 0-1.7.4-1.7 1.1 0 .9 1 1.3 2.8 2 2.6 1.2 3.5 2.6 3.5 4.8 0 2.8-2.2 4.8-6 4.8zM323.7 47.4v12.4h-4.4V47.4h-3.5V44h11.4v3.4h-3.5zM330.1 59.7V44h9.7v3.4h-5.3v2.7h4.6v3.3h-4.6v2.9h5.5v3.4h-9.9zM348.1 54.5h-.5v5.3h-4.3V44.5c1.5-.5 3.4-.7 5-.7 4.7 0 6.9 2 6.9 5.3-.1 3.5-2.4 5.4-7.1 5.4zm.3-7.6c-.3 0-.6 0-.8.1v4.3h.5c1.9 0 2.8-.5 2.8-2.2-.1-1.6-.9-2.2-2.5-2.2z"/></g></g></a>
            <g id="timerIcon"><path d="M90.4 51.9c0-19.9-14.1-36.1-34-36.1s-34 16.1-34 36 14.1 33.9 34 33.9 34-13.9 34-33.8z" style="fill:#83cbcd"/><path d="M90.4 51.9c0 19.9-14.1 33.8-34 33.8s-34-14-34-33.9c0-1.1 0-2.1.1-3.2h67.8c.1 1.2.1 2.2.1 3.3z" style="fill:#88e1e3"/><path d="M56.5 19.8c17.1 0 30 13.8 30 32.1 0 17.6-12.3 29.9-30 29.9S26.4 69.5 26.4 51.9c0-18.3 12.9-32.1 30.1-32.1m0-3.9c-19.9 0-34 16.1-34 36s14.1 33.9 34 33.9 34-13.9 34-33.9-14.1-36-34-36z" style="fill:#32a5a6" class="textBlock1"/><path d="M90.5 51.9c0-19.9-14.1-36.1-34-36.1S22.4 32 22.4 51.9s14.1 33.9 34.1 33.9 34-14 34-33.9z" style="fill:none;stroke:#142c4d;stroke-width:2.6867;stroke-miterlimit:10"/><path class="textColor" d="M83.9 51.2c3.7-14.3-3.7-27.3-18-31S39.5 23.6 35.8 38s10 3.2 24.4 6.9 20 20.6 23.7 6.3z" style="opacity:.16"/></g><path style="fill:none" d="M34.6 35.7h43.7V65H34.6z"/><text text-anchor="middle" transform="translate(57.165 62.236)" class="textColor bikeFont" style="font-size:34px; text-align: center; font-family:'Repo-Black'">${this.timer}</text>
          </svg>
        `}
      </footer>
    `;
  }

  _nextSetHandler(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.dispatchEvent(new Event('next-step', {
      composed: true,
      bubbles: true
    }));
  }
}

customElements.define('e-footer', EFooter);
