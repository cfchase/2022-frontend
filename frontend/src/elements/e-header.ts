import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { variable } from '../globals.ts';
import styles from '../../assets/style/summit-22-style.css';

export class EHeader extends LitElement {
  static styles = [styles, css`
    :host {
      display: block;
    }
  `];

  render() {
    return html`
      <header class="header-area" role="header">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 420 150" style="enable-background:new 0 0 420 150" xml:space="preserve"><style>.st5{fill:#c5d9e5}.st6{enable-background:new}.st9{opacity:.15}.st10{fill:#d5eaef}.st18{fill:#fff}.st19{fill:none}.st20{font-family:&apos;Repo-Black&apos;}</style><path d="M297.3 124.8H33c-6.3 0-11.4-6.3-11.4-14.2V30.1c0-7.6 5-13.8 11.1-13.8h355.8c6.1 0 11.1 6.2 11.1 13.8V96c0 5.9-3.8 10.7-8.6 10.7l-77.5.4c-4.5 0-8.1 4.5-8.1 10.1v-2.4c0 5.5-3.6 10-8.1 10z" style="fill:#82c9cb"/><path d="M311.3 109.3v3.8c0 3.1-2.5 5.6-5.6 5.6l-277.1.9c-3.6 0-6.6-2.9-6.6-6.6V79c0-10.7 9.5-18.9 20.1-17.3L90.4 68c80.1 12.2 161.4 15.3 242.3 9.3l50.2-3.2c9.6-.7 17.7 6.8 17.7 16.4v11.3c0 2.1-1.7 3.7-3.7 3.7-15 .1-67-.5-81.6-.2-2.2.1-4 1.8-4 4z" style="opacity:.15;fill:#faffff;enable-background:new"/><path d="M301.8 118.4h-272c-6.1 0-11.1-5-11.1-11.1V29.5c0-6.9 5.6-12.6 12.6-12.6h359.2c6.9 0 12.6 5.6 12.6 12.6v65.9c0 5.4-4.4 9.7-9.7 9.7h-81.1c-.9 0-1.6.7-1.6 1.6v2.9c-.1 4.8-4 8.8-8.9 8.8zM31.3 24.1c-3 0-5.4 2.4-5.4 5.4v77.8c0 2.1 1.7 3.9 3.9 3.9h272c.9 0 1.6-.7 1.6-1.6v-2.9c0-4.8 3.9-8.8 8.8-8.8h81.1c1.4 0 2.5-1.1 2.5-2.5V29.5c0-3-2.4-5.4-5.4-5.4H31.3z" style="fill:#45b8bb"/><path d="M416.3 16.1c-.3-2.2-2.1-3.8-4.4-3.8s-4.2-2.1-4.2-4.5v-.5c0-2.5-2-4.5-4.5-4.5H16.7c-2.5 0-4.5 2-4.5 4.5v.2c0 2.6-2.1 4.6-4.7 4.8-2.1.1-3.7 1.8-3.9 3.8v117.8h.1c.3 2.2 2.1 3.8 4.4 3.8s4.2 2.1 4.2 4.5v.5c0 2.5 2 4.5 4.5 4.5h386.5c2.5 0 4.5-2 4.5-4.5v-.2c0-2.6 2.1-4.6 4.7-4.8 2.1-.1 3.7-1.8 3.9-3.8V16.7l-.1-.6zm-394 91.2V29.4c0-5 4-9 9-9h359.2c5 0 9 4 9 9v65.9c0 3.4-2.7 6.1-6.1 6.1h-81.1c-2.9 0-5.2 2.3-5.2 5.2v2.9c0 2.9-2.3 5.2-5.2 5.2h-272c-4.3.1-7.6-3.3-7.6-7.4z" style="fill:#b6d2df"/><path d="M416.4 73.9v60c-.2 2.1-1.8 3.7-3.9 3.8-2.6.2-4.7 2.2-4.7 4.8v.2c0 2.5-2 4.5-4.5 4.5H16.8c-2.5 0-4.5-2-4.5-4.5v-.5c0-2.3-1.9-4.5-4.2-4.5-2.2 0-4.1-1.7-4.4-3.8h-.1V50.6l18.7 1v55.6c0 4.1 3.4 7.5 7.5 7.5h272c2.9 0 5.2-2.3 5.2-5.2v-2.9c0-2.9 2.3-5.2 5.2-5.2h81.1c3.4 0 6.1-2.7 6.1-6.1V72.9l17 1z" style="fill:#d2e2e9"/><g id="greenLight"><path class="st5" d="M49.4 116.9c0-2.4-1.7-4.4-4.1-4.4-2.4 0-4.2 2-4.2 4.4s1.7 4.1 4.2 4.1c2.3 0 4.1-1.7 4.1-4.1z"/><g class="st6"><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="45.2" y1="83.836" x2="45.2" y2="90.403" gradientTransform="matrix(1 0 0 -1 0 204)"><stop offset=".027" style="stop-color:#05c66b"/><stop offset=".106" style="stop-color:#19ca73"/><stop offset=".234" style="stop-color:#35cf7d"/><stop offset=".347" style="stop-color:#45d284"/><stop offset=".433" style="stop-color:#4bd386"/><stop offset=".546" style="stop-color:#53d58c"/><stop offset=".723" style="stop-color:#6ad99e"/><stop offset=".941" style="stop-color:#8fe1ba"/><stop offset=".991" style="stop-color:#98e3c1"/></linearGradient><path d="M48.6 116.8c0-2-1.4-3.6-3.4-3.6s-3.4 1.6-3.4 3.6 1.4 3.4 3.4 3.4 3.4-1.4 3.4-3.4z" style="fill:url(#SVGID_1_)"/></g><path d="M45.2 113.6c1.7 0 3 1.4 3 3.2 0 1.8-1.2 3-3 3s-3-1.2-3-3 1.3-3.2 3-3.2m0-.4c-2 0-3.4 1.6-3.4 3.6s1.4 3.4 3.4 3.4 3.4-1.4 3.4-3.4-1.4-3.6-3.4-3.6z" style="fill:#08c632" class="st6"/><g class="st9"><path class="st10" d="M48 116.8c.4-1.4-.4-2.7-1.8-3.1-1.4-.4-2.6.3-3 1.8-.4 1.4 1 .3 2.4.7 1.4.3 2 2 2.4.6z"/></g><g class="st6"><linearGradient id="SVGID_00000171693081049582321750000005350248220513338811_" gradientUnits="userSpaceOnUse" x1="45.149" y1="84.254" x2="45.197" y2="86.495" gradientTransform="matrix(1 0 0 -1 0 204)"><stop offset="0" style="stop-color:#02a651"/><stop offset="1" style="stop-color:#49d5e9;stop-opacity:0"/></linearGradient><path style="fill:url(#SVGID_00000171693081049582321750000005350248220513338811_)" d="M42.4 117.3c.2 1.4 1.3 2.4 2.8 2.4s2.6-.9 2.8-2.3l-5.6-.1z"/></g></g><g id="yellowLight"><path class="st5" d="M58.8 116.9c0-2.4-1.7-4.4-4.1-4.4s-4.2 2-4.2 4.4 1.7 4.1 4.2 4.1 4.1-1.7 4.1-4.1z"/><g class="st6"><linearGradient id="SVGID_00000051342026070840443270000018057511591282305455_" gradientUnits="userSpaceOnUse" x1="54.6" y1="83.836" x2="54.6" y2="90.403" gradientTransform="matrix(1 0 0 -1 0 204)"><stop offset=".027" style="stop-color:#cabd25"/><stop offset=".087" style="stop-color:#cdc233"/><stop offset=".222" style="stop-color:#d2cd4f"/><stop offset=".342" style="stop-color:#d5d35f"/><stop offset=".433" style="stop-color:#d6d565"/><stop offset=".566" style="stop-color:#d8d76d"/><stop offset=".775" style="stop-color:#dedb84"/><stop offset=".991" style="stop-color:#e5e1a2"/></linearGradient><path style="fill:url(#SVGID_00000051342026070840443270000018057511591282305455_)" d="M58 116.8c0-2-1.4-3.6-3.4-3.6s-3.4 1.6-3.4 3.6 1.4 3.4 3.4 3.4 3.4-1.4 3.4-3.4z"/></g><path d="M54.6 113.6c1.7 0 3 1.4 3 3.2 0 1.8-1.2 3-3 3s-3-1.2-3-3 1.3-3.2 3-3.2m0-.4c-2 0-3.4 1.6-3.4 3.6s1.4 3.4 3.4 3.4 3.4-1.4 3.4-3.4-1.4-3.6-3.4-3.6z" style="fill:#cab924" class="st6"/><g class="st9"><path class="st10" d="M57.4 116.8c.4-1.4-.4-2.7-1.8-3.1-1.4-.4-2.6.3-3 1.8-.4 1.4 1 .3 2.4.7 1.4.3 2 2 2.4.6z"/></g><g class="st6"><linearGradient id="SVGID_00000174576903000750547220000007998817428045490561_" gradientUnits="userSpaceOnUse" x1="54.549" y1="84.254" x2="54.597" y2="86.496" gradientTransform="matrix(1 0 0 -1 0 204)"><stop offset="0" style="stop-color:#a9a225"/><stop offset="1" style="stop-color:#e8e066;stop-opacity:0"/></linearGradient><path style="fill:url(#SVGID_00000174576903000750547220000007998817428045490561_)" d="M51.8 117.3c.2 1.4 1.3 2.4 2.8 2.4s2.6-.9 2.8-2.3l-5.6-.1z"/></g></g><g id="progressBar"><path id="connector" style="fill:none;stroke:#fff;stroke-width:2.1995;stroke-miterlimit:10" d="M308.8 75.1H375"/><circle id="BikeThree" class="progress" cx="376.4" cy="75" r="5.8"/><circle id="bikeTwo" class="progress" cx="341.5" cy="75" r="5.8"/><circle id="bikeOne" class="progressDone" cx="303.8" cy="75" r="5.8"/></g><path id="starIcon" class="st18" d="M54.1 73c-4.5 0-8.1 3.6-8.1 8.1s3.6 8.1 8.1 8.1 8.1-3.6 8.1-8.1-3.6-8.1-8.1-8.1zm4.1 7.4-1.5 1.1c-.2.2-.3.5-.2.7l.6 1.7c.2.6-.5 1.1-1 .7l-1.5-1.1c-.2-.2-.5-.2-.8 0l-1.5 1.1c-.5.4-1.2-.1-1-.7l.6-1.7c.1-.3 0-.6-.2-.7l-1.5-1.1c-.5-.4-.3-1.2.4-1.2h1.8c.3 0 .5-.2.6-.5l.6-1.7c.2-.6 1.1-.6 1.3 0l.6 1.7c.1.3.3.5.6.5h1.8c.5 0 .8.8.3 1.2z"/><path class="st19" d="M44.5 35.4H238v21.9H44.5z"/><text transform="translate(44.545 49.464)" class="st18 st20 bikeFont headerUser" >Snazzy Mushroom</text><path class="st19" d="M66.5 74.4H199V89H66.5z"/><text transform="translate(66.545 86.124)" class="st18 st20 bikeFont headerPoints" >1257530</text><path class="st19" d="M295.5 39.4H392V54h-96.5z"/><text transform="translate(295.545 50.344)" class="st18 st20 bikeFont headerPoints">Your orders</text><g id="ticketFeed"><path d="M296.4 136.5H30.5c-3.1 0-5.6-2.5-5.6-5.6 0-3.1 2.5-5.6 5.6-5.6h265.9c3.1 0 5.6 2.5 5.6 5.6 0 3.1-2.5 5.6-5.6 5.6z" style="fill:#596464"/><path d="M295.4 127.6c2.2 0 4.1 1.5 4.1 3.3 0 1.8-1.8 3.3-4.1 3.3h-264c-2.2 0-4.1-1.5-4.1-3.3s1.8-3.3 4.1-3.3h264m0-1.2h-264c-3.1 0-5.6 2-5.6 4.5s2.5 4.5 5.6 4.5h264c3.1 0 5.6-2 5.6-4.5s-2.5-4.5-5.6-4.5z" style="fill:#515656"/><path d="M296.4 126.8c2.3 0 4.1 1.8 4.1 4.1s-1.8 4.1-4.1 4.1H30.5c-2.3 0-4.1-1.8-4.1-4.1s1.8-4.1 4.1-4.1h265.9m0-1.5H30.5c-3.1 0-5.6 2.5-5.6 5.6s2.5 5.6 5.6 5.6h265.9c3.1 0 5.6-2.5 5.6-5.6s-2.5-5.6-5.6-5.6z" style="fill:#434949"/></g>
          <a xlink:href="https://google.ca" alt="View orders"><g id="BUTTON"><path d="M400.5 135.9s.2 1-41.1 1-39.3-1-39.3-1c-3.1 0-5.7-2.6-5.7-5.7l-.5-14.9c0-3.1 2.6-5.7 5.7-5.7 0 0-3.1-1 40.3-1s41 1 41 1c3.1 0 5.7 2.6 5.7 5.7l-.5 14.9c.1 3.2-2.5 5.7-5.6 5.7z" style="fill:#abc0c9"/><path d="M400.5 135.9s.2 1-41.1 1-39.3-1-39.3-1c-3.1 0-5.7-2.6-5.7-5.7l-.5-14.9c0-3.1 2.6-5.7 5.7-5.7 0 0-3.1-1 40.3-1s41 1 41 1c3.1 0 5.7 2.6 5.7 5.7l-.5 14.9c.1 3.2-2.5 5.7-5.6 5.7z" style="fill:#5a5a5b" class="st9"/><linearGradient id="SVGID_00000058578613086192483710000010175557902644535977_" gradientUnits="userSpaceOnUse" x1="360.351" y1="70.226" x2="360.285" y2="93.09" gradientTransform="matrix(1 0 0 -1 0 204)"><stop offset=".522" style="stop-color:#fbcc9b"/><stop offset=".523" style="stop-color:#fbbd80"/><stop offset=".523" style="stop-color:#fab068"/><stop offset=".524" style="stop-color:#faa757"/><stop offset=".525" style="stop-color:#faa24c"/><stop offset=".525" style="stop-color:#faa049"/></linearGradient><path style="fill:url(#SVGID_00000058578613086192483710000010175557902644535977_)" d="M398.8 134.5s-2 .8-38.9.8-38.1-.8-38.1-.8c-2.8 0-5.1-2.3-5.1-5.1l-.4-13.3c0-2.8 2.3-5.1 5.1-5.1 0 0 .3-.8 39-.8s38.8.8 38.8.8c2.8 0 5.1 2.3 5.1 5.1l-.4 13.3c0 2.8-2.3 5.1-5.1 5.1z"/><path d="M397.2 132.7s-3.3.8-37.2.8-36.1-.8-36.1-.8c-2.6 0-4.7-2.1-4.7-4.7l-.4-11c0-2.6 2.1-4.7 4.7-4.7 0 0 1.2-.8 37-.8s37.2.8 37.2.8c2.6 0 4.7 2.1 4.7 4.7l-.4 11c-.1 2.6-2.2 4.7-4.8 4.7z" style="fill:#fbb666"/><g class="st6"><path class="st18" d="M333.4 125.4h-1.2l-.6-.1c-.9-2.2-1.8-4.8-2.5-7.1h2.1c.3 1.1.6 2.3 1 3.4.1.5.2.9.4 1.2.1-.2.2-.8.4-1.2.3-1.1.7-2.3 1-3.3h2c-.8 2.2-1.7 4.8-2.6 7.1zM337 125.4v-7.2h2v7.2h-2zM340 125.4v-7.2h4.4v1.5H342v1.2h2.1v1.5H342v1.3h2.5v1.5H340v.2zM352.7 125.4H351c-.3-.9-.6-1.9-.9-2.9-.1-.3-.1-.6-.2-.7 0 .1-.1.4-.2.7-.3 1-.6 2-.9 2.9h-1.7c-.6-2.3-1.2-4.7-1.7-7.2h2c.2 1.2.4 2.2.6 3.3.1.4.1.8.2 1 0-.1.1-.5.2-.8.3-1 .5-2.1.8-3.2h1.5c.2 1 .5 2.1.8 3.1.1.3.2.7.2.8 0-.1.1-.4.1-.7.2-1.1.4-2.4.6-3.6h1.9c-.4 2.6-1 5-1.6 7.3zM361.5 125.5c-2 0-3.2-1.5-3.2-3.7s1.2-3.7 3.2-3.7 3.2 1.5 3.2 3.7c0 2.3-1.2 3.7-3.2 3.7zm0-5.8c-.8 0-1.2 1-1.2 2.1s.4 2.1 1.2 2.1 1.2-1 1.2-2.1-.3-2.1-1.2-2.1zM369.4 125.4c-.5-.9-.9-1.9-1.4-2.7h-.3v2.7h-2v-6.9c.7-.2 1.5-.3 2.3-.3 2.1 0 3.2.8 3.2 2.3 0 .8-.5 1.5-1.2 1.8.6.8 1.2 2 1.7 3l-2.3.1zm-1.2-5.8c-.2 0-.4 0-.5.1v2h.5c.5 0 1-.4 1-1-.1-.9-.6-1.1-1-1.1zM374.6 125.5c-.7 0-1.5-.1-2.2-.3v-6.7c.7-.2 1.5-.3 2.2-.3 2.5 0 3.7 1.4 3.7 3.7 0 2.1-1.2 3.6-3.7 3.6zm.1-5.8h-.3v4.2h.3c1.1 0 1.6-.6 1.6-2.1s-.5-2.1-1.6-2.1zM379.7 125.4v-7.2h4.4v1.5h-2.4v1.2h2.1v1.5h-2.1v1.3h2.5v1.5h-4.5v.2zM389.4 125.4c-.5-.9-.9-1.9-1.4-2.7h-.3v2.7h-2v-6.9c.7-.2 1.5-.3 2.3-.3 2.1 0 3.2.8 3.2 2.3 0 .8-.5 1.5-1.2 1.8.6.8 1.2 2 1.7 3l-2.3.1zm-1.2-5.8c-.2 0-.4 0-.5.1v2h.5c.5 0 1-.4 1-1-.1-.9-.5-1.1-1-1.1z"/>
          </g></a></g>
        </svg>
      </header>
    `;
  }
}

customElements.define('e-header', EHeader);