import { css, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import { query } from "lit/decorators/query.js";
import { property } from "lit/decorators/property.js";
import { state } from "lit/decorators/state.js";
import { ECountdown } from "./e-countdown";"./e-countdown";
import styles from "../global.css";

/*
 * The general idea is that we have three canvas elements
 * stacked on top of each other. The first canvas is visible
 * while canvas 2 and 3 are hidden. A timer starts and in the
 * first 10 seconds, a user can draw on canvas 1. Once 10 seconds
 * have passed, canvas 2 is no longer hidden and because of
 * the canvases being absolutely positioned, canvas 1 still visible
 * but canvas 2 becomes the active canvas the user draws on. 10
 * more seconds go by and canvas 3 becomes active.
 * 
 * Once the timer runs out, the event listeners are removed from
 * all three canvases and the user can no longer draw. 
 * 
 * To generate a composite image of the three canvases, when we
 * generate the image, we draw canvas 1 onto canvas 2. We then
 * draw the resulting image of canvas 2 onto canvas 3 which
 * combines all three layers into a single image as a base64
 * encoded image.
 */

const timerLength: number = 30;
const maxIterations: number = 3;
let interval: number;
let ctx: CanvasRenderingContext2D;
let prevX: number = 0;
let prevY: number = 0;
let currX: number = 0;
let currY: number = 0;
let offset: DOMRect;

@customElement("e-draw")
export class EDraw extends LitElement {
  static styles = [styles, css`
		:host {
			display: block;
      position: relative;
		}

    canvas {
      position: absolute;
      border: 1px solid black;
    }
  `];

  @property({ type: Number }) public activeCanvasIndex: number = 0;
  @property({ type: Object }) public activeCanvas: HTMLCanvasElement;

  @query("img") _img: HTMLImageElement;
  @query("#layer-1") _canvas1: HTMLCanvasElement;
  @query("#layer-2") _canvas2: HTMLCanvasElement;
  @query("#layer-3") _canvas3: HTMLCanvasElement;
  @query("#countdown") _timer: ECountdown;

  @state() private canvases: Array<HTMLCanvasElement> = [];
  @state() private running: boolean = false;
  @state() private drawing: boolean = false;
  @state() private canvasHeight: number;
  @state() private iterations: number = 0;

  constructor() {
    super();
    this._touchHandler = this._touchHandler.bind(this);
    this._mouseHandler = this._mouseHandler.bind(this);
    this.addEventListener("timerComplete", this._timerCompleteHandler);
  }

  disconnectedCallback(): void {
    this.removeEventListener("timerComplete", this._timerCompleteHandler);
  }

  protected firstUpdated(): void {
    this.canvases = [this._canvas1, this._canvas2, this._canvas3];
    this._init();
  }

  protected updated(changed: PropertyValues<this>): void {
    if (changed.has("activeCanvasIndex")) {
      this.activeCanvas = this.canvases[this.activeCanvasIndex];
    }

    if (changed.has("activeCanvas")) {
      this.activeCanvas.removeAttribute("hidden");
      ctx = this.activeCanvas.getContext("2d");
    }
  }

  render(): TemplateResult {
    return html`
      <h2>Print your frame</h2>
      <h3>Layer ${this.activeCanvasIndex + 1} of 3</h3>
      <div>
        <button @click="${this._startTimer}" ?disabled=${this.running}>Start timer</button>
        <button @click="${this._reset}">Reset</button>
        <button @click="${this._generateImage}">Generate image</button>
      </div>
      <img>
      <div style="height: ${this.canvasHeight}px">
        <canvas id="layer-1"></canvas>
        <canvas id="layer-2" hidden></canvas>
        <canvas id="layer-3" hidden></canvas>
      </div>
      <e-countdown id="countdown" totalseconds="10"></e-countdown>
    `;
  }

  _init(): void {
    this.activeCanvas = this.canvases[this.activeCanvasIndex];
    this.canvases.forEach((canvas: HTMLCanvasElement, index: number) => {
      /*
       * attempting to create a 4/3 ratio for the canvas
       */
      canvas.width = window.innerWidth - 16;
      canvas.height = (window.innerWidth - 16) * 0.75;

      if (index === 0) {
        this.canvasHeight = canvas.height;
      }
    });
  }

  _addListeners(): void {
    this.canvases.forEach((canvas: HTMLCanvasElement) => {
      if ("ontouchstart" in document.documentElement) {
        canvas.addEventListener("touchstart", this._touchHandler);
        canvas.addEventListener("touchmove", this._touchHandler);
        canvas.addEventListener("touchend", this._touchHandler);
      } else {
        canvas.addEventListener("mousedown", this._mouseHandler);
        canvas.addEventListener("mouseup", this._mouseHandler);
        canvas.addEventListener("mousemove", this._mouseHandler);
        canvas.addEventListener("mouseout", this._mouseHandler);
      }
    });
  }

  _removeListeners(): void {
    this.canvases.forEach((canvas: HTMLCanvasElement) => {      
      if ("ontouchstart" in document.documentElement) {
        canvas.removeEventListener("touchstart", this._touchHandler);
        canvas.removeEventListener("touchmove", this._touchHandler);
        canvas.removeEventListener("touchend", this._touchHandler);
      } else {
        canvas.removeEventListener("mousedown", this._mouseHandler);
        canvas.removeEventListener("mouseup", this._mouseHandler);
        canvas.removeEventListener("mousemove", this._mouseHandler);
        canvas.removeEventListener("mouseout", this._mouseHandler);
      }
    });
  }

  _startTimer(): void {
    this.running = true;
    this._addListeners();
    this._timer.start();
  }

  _reset(): void {
    this.canvases.forEach((canvas: HTMLCanvasElement) => {
      const context: CanvasRenderingContext2D = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
    });

    window.clearInterval(interval);
    this._timer.reset();

    this.activeCanvas = this._canvas1;
    this._canvas1.removeAttribute("hidden");
    this._canvas2.setAttribute("hidden", "");
    this._canvas3.setAttribute("hidden", "");
    this._img.src = "";
    this.activeCanvasIndex = 0;
    this.iterations = 0;
    this.running = false;
  }

  _touchHandler(e: TouchEvent): void {
    e.preventDefault();

    switch(e.type) {
      case "touchstart":
        this._draw("down", e.touches[0].clientX, e.touches[0].clientY);
        break;

      case "touchmove":
        this._draw("move", e.touches[0].clientX, e.touches[0].clientY);
        break;

      case "touchend":
        this._draw("up");
        break;
    }
  }

  _mouseHandler(e: MouseEvent): void {
    switch(e.type) {
      case "mousedown":
        this._draw("down", e.clientX, e.clientY);
        break;

      case "mouseup":
        this._draw("up");
        break;

      case "mousemove":
        this._draw("move", e.clientX, e.clientY);
        break;

      case "mouseout":
        this._draw("out");
        break;
    }
  }

  _draw(action:string, left?: number, top?: number): void {
    if (!offset) {
      offset = this.activeCanvas.getBoundingClientRect();
    }

    if (action === "down") {
      this.drawing = true;
      prevX = left - offset.left;
      prevY = top - offset.top;
    }

    if (action === "up" || action === "out") {
      this.drawing = false;
      offset = null;
    }

    if (action === "move" && this.drawing) {
      currX = left - offset.left;
      currY = top - offset.top;

      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(currX, currY);
      ctx.lineWidth = 5;
      ctx.strokeStyle = "rgba(0, 0, 0, 0.333)";
      ctx.stroke();
      ctx.closePath();

      prevX = currX;
      prevY = currY;
    }
  }

  _timerCompleteHandler(): void {
    this.iterations++;

    if (this.iterations < maxIterations) {
      this._timer.reset();
      this._timer.start();
      this.activeCanvasIndex++;
    } else {
      this._timer.stop();
      this._removeListeners();
    }
  }

  /*
   * Draw the contents of canvas 1 onto canvas 2. Then draw the
   * result of canvas 2 onto canvas 3 to get a full composite
   * image with all three layers combined.
   */
  _generateImage(): void {
    this._canvas1.setAttribute("hidden", "");
    this._canvas2.setAttribute("hidden", "");

    const canvas2Context = this._canvas2.getContext("2d");
    const canvas3Context = this._canvas3.getContext("2d");
    canvas2Context.drawImage(this._canvas1, 0, 0);
    canvas3Context.drawImage(this._canvas2, 0, 0);

    const dataURL: string = this._canvas3.toDataURL();
    this._img.src = dataURL;
  }
}