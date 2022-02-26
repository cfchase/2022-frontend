import { LitElement, TemplateResult, html, PropertyValues, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { asyncReplace } from 'lit/directives/async-replace.js';
import styles from '../global.css.ts';

@customElement('e-countdown')
export class ECountdown extends LitElement {
  static readonly styles = [styles];

  @property()
	start: number = 60;

  @property({ type: Boolean, reflect: true })
	complete = false;

	@state()
	timer: number = this.start;

	private _countdown: any;

  render(): TemplateResult {
    return html`
			${this.timer}
    `;
  }

	protected updated(_changedProperties: Map<string | number | symbol, unknown>): void {
	  if (_changedProperties.has('timer')) {
			this.complete = this.timer === 0;
		}
	}

	protected firstUpdated(): void {
		this._countdown = setInterval(this.updateTimer.bind(this), 1000);
	}

	disconnectedCallback(): void {
		clearInterval(this._countdown);
	}

	private updateTimer(): void {
		if (this.timer > 0)
			this.timer--;
	}
}