import type { Asset } from "@/client/domain/asset.type";
import {
	deleteAsset,
	getAllAssets,
} from "@/client/repositories/asset.repository";
import { formatCurrency, formatDate } from "@/client/shared/format.utils";
import { navigate } from "@/client/shared/navigation.utils";

const html = String.raw;

/**
 * Component for displaying the list of assets
 * Usage: <asset-list></asset-list>
 */
export class AssetListComponent extends HTMLElement {
	#template: string;
	#assets: Asset[] = [];
	#assetListElement: HTMLElement | null = null;
	#addButton: HTMLButtonElement | null = null;
	#refreshButton: HTMLButtonElement | null = null;

	constructor() {
		super();

		this.#template = html`
      <article>
        <header>
          <div class="grid">
            <div>
              <h2>My Assets</h2>
            </div>
            <div class="text-right">
              <button id="add-button">Add Asset</button>
              <button id="refresh-button" class="secondary">🔄 Refresh</button>
            </div>
          </div>
        </header>
        <section id="asset-list">
          <div aria-busy="true">Loading assets...</div>
        </section>
      </article>
    `;

		this.innerHTML = this.#template;
		this.loadAssets();
	}

	/**
	 * Load assets from API
	 */
	async loadAssets(): Promise<void> {
		try {
			this.#assets = await getAllAssets();
			this.renderAssets();
		} catch (error) {
			console.error("Failed to load assets:", error);
			this.renderError("Failed to load assets. Please try again.");
		}
	}

	/**
	 * Render assets in the list
	 */
	renderAssets(): void {
		const assetList = this.querySelector<HTMLElement>("#asset-list");
		if (!assetList) return;

		if (this.#assets.length === 0) {
			assetList.innerHTML =
				'<p>No assets found. Click "Add Asset" to create one.</p>';
			return;
		}

		const table = document.createElement("table");
		table.role = "grid";

		// Create table header
		const thead = document.createElement("thead");
		thead.innerHTML = html`
      <tr>
        <th scope="col">Category</th>
        <th scope="col">Value</th>
        <th scope="col">Quantity</th>
        <th scope="col">Acquisition Date</th>
        <th scope="col">Actions</th>
      </tr>
    `;
		table.appendChild(thead);

		// Create table body
		const tbody = document.createElement("tbody");

		for (const asset of this.#assets) {
			const tr = document.createElement("tr");

			// Get category name (placeholder until we have category data)
			const categoryName = `Category ${asset.category_id}`;

			// Format the date correctly - convert to string for the formatDate function
			const formattedDate = formatDate(asset.acquisition_date.toISOString());

			tr.innerHTML = html`
        <td>${categoryName}</td>
        <td>${formatCurrency(asset.value)}</td>
        <td>${asset.quantity}</td>
        <td>${formattedDate}</td>
        <td>
          <div class="grid">
            <button class="edit-button small" data-id="${asset.id}">Edit</button>
            <button class="delete-button small secondary outline" data-id="${asset.id}">Delete</button>
          </div>
        </td>
      `;

			// Add event listeners for edit and delete buttons
			const editButton = tr.querySelector<HTMLButtonElement>(".edit-button");
			const deleteButton =
				tr.querySelector<HTMLButtonElement>(".delete-button");

			if (editButton) {
				editButton.addEventListener("click", () => this.#onEdit(asset.id));
			}

			if (deleteButton) {
				deleteButton.addEventListener("click", () => this.#onDelete(asset.id));
			}

			tbody.appendChild(tr);
		}

		table.appendChild(tbody);
		assetList.innerHTML = "";
		assetList.appendChild(table);
	}

	/**
	 * Render error message
	 */
	renderError(message: string): void {
		const assetList = this.querySelector<HTMLElement>("#asset-list");
		if (!assetList) return;

		assetList.innerHTML = `<p class="error">${message}</p>`;
	}

	/**
	 * Handle edit button click
	 */
	#onEdit = (id: number): void => {
		navigate(`assets/edit/${id}`);
	};

	/**
	 * Handle delete button click
	 */
	#onDelete = async (id: number): Promise<void> => {
		if (!confirm("Are you sure you want to delete this asset?")) {
			return;
		}

		try {
			const success = await deleteAsset(id);
			if (success) {
				// Reload assets after deletion
				this.loadAssets();
			} else {
				alert("Failed to delete asset. Please try again.");
			}
		} catch (error) {
			console.error("Error deleting asset:", error);
			alert("An error occurred while deleting the asset.");
		}
	};

	/**
	 * Handle add button click
	 */
	#onAdd = (): void => {
		navigate("assets/add");
	};

	/**
	 * Handle refresh button click
	 */
	#onRefresh = (): void => {
		this.loadAssets();
	};

	connectedCallback(): void {
		this.#assetListElement = this.querySelector<HTMLElement>("#asset-list");
		this.#addButton = this.querySelector<HTMLButtonElement>("#add-button");
		this.#refreshButton =
			this.querySelector<HTMLButtonElement>("#refresh-button");

		if (this.#addButton) {
			this.#addButton.addEventListener("click", this.#onAdd);
		}

		if (this.#refreshButton) {
			this.#refreshButton.addEventListener("click", this.#onRefresh);
		}
	}

	disconnectedCallback(): void {
		if (this.#addButton) {
			this.#addButton.removeEventListener("click", this.#onAdd);
		}

		if (this.#refreshButton) {
			this.#refreshButton.removeEventListener("click", this.#onRefresh);
		}

		// Remove event listeners from edit and delete buttons
		const editButtons =
			this.querySelectorAll<HTMLButtonElement>(".edit-button");
		const deleteButtons =
			this.querySelectorAll<HTMLButtonElement>(".delete-button");

		// Convert NodeListOf to Array before using for...of
		for (const button of Array.from(editButtons)) {
			const id = Number(button.dataset.id);
			button.removeEventListener("click", () => this.#onEdit(id));
		}

		for (const button of Array.from(deleteButtons)) {
			const id = Number(button.dataset.id);
			button.removeEventListener("click", () => this.#onDelete(id));
		}
	}
}
