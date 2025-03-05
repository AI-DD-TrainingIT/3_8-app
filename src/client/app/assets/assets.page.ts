import { AssetListComponent } from "./components/asset-list.component";

const html = String.raw;

// Register components
customElements.define("asset-list", AssetListComponent);

/**
 * Assets page component
 * Displays the list of user assets
 */
export class AssetsPage extends HTMLElement {
	#template: string;

	constructor() {
		super();

		this.#template = html`
      <main class="container">
        <asset-list></asset-list>
      </main>
    `;

		this.innerHTML = this.#template;
	}
}
