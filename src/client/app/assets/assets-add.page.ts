import { AssetFormComponent } from "./components/asset-form.component";
import { CategorySelectComponent } from "./components/category-select.component";

const html = String.raw;

// Register components
customElements.define("asset-form", AssetFormComponent);
customElements.define("category-select", CategorySelectComponent);

/**
 * Assets Add page component
 * Displays the form to add a new asset
 */
export class AssetsAddPage extends HTMLElement {
	#template: string;

	constructor() {
		super();

		this.#template = html`
      <main class="container">
        <asset-form></asset-form>
      </main>
    `;

		this.innerHTML = this.#template;
	}
}
