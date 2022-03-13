import { LitElement, TemplateResult, html, PropertyValues, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { asyncReplace } from 'lit/directives/async-replace.js';
import styles from '../global.css.ts';

@customElement('e-countdown')
export class ECountdown extends LitElement {
  static readonly styles = [styles];

  @property()
	totalSeconds: number = 60;

  @property({ type: Boolean, reflect: true })
	complete = false;

	@state()
	timer: number = 0;

	private _countdown: any;

  render(): TemplateResult {
    return html`
			${this.timer}
    `;
  }

	protected updated(_changedProperties: Map<string | number | symbol, unknown>): void {
	  if (_changedProperties.has('timer')) {
			this.complete = this.timer === 0;

			if (this.complete) {
				const event: Event = new Event("timerComplete", {
					bubbles: true,
					composed: true
				});
				this.dispatchEvent(event);
			}
		}
	}

	protected firstUpdated(): void {
		this.timer = this.totalSeconds;
	}

	disconnectedCallback(): void {
		this.stop();
	}

	private updateTimer(): void {
		if (this.timer > 0)
			this.timer--;
			const event: CustomEvent = new CustomEvent("timerUpdate", {
				bubbles: true,
				composed: true,
				detail: {
					timer: this.timer
				}
			});

			this.dispatchEvent(event);

	}

	start(): void {
		this._countdown = setInterval(this.updateTimer.bind(this), 1000);
	}

	stop(): void {
		clearInterval(this._countdown);
	}

	reset(): void {
		this.stop();
		this.timer = this.totalSeconds;
	}
}