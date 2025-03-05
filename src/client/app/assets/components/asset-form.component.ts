import type { Asset } from "@/client/domain/asset.type";
import { NULL_ASSET, validateAsset } from "@/client/domain/asset.type";
import type { Category } from "@/client/domain/category.type";
import { createAsset } from "@/client/repositories/asset.repository";
import { getAllCategories } from "@/client/repositories/category.repository";
import { navigate } from "@/client/shared/navigation.utils";

const html = String.raw;

/**
 * Component for creating new assets
 * Usage: <asset-form></asset-form>
 */
export class AssetFormComponent extends HTMLElement {
	#template: string;
	#asset: Partial<Asset> = { ...NULL_ASSET };
	#categories: Category[] = [];
	#formElement: HTMLFormElement | null = null;
	#categorySelect: HTMLSelectElement | null = null;
	#valueInput: HTMLInputElement | null = null;
	#quantityInput: HTMLInputElement | null = null;
	#acquisitionDateInput: HTMLInputElement | null = null;
	#submitButton: HTMLButtonElement | null = null;
	#cancelButton: HTMLButtonElement | null = null;

	constructor() {
		super();

		this.#template = html`
      <article>
        <header>
          <h2>Add New Asset</h2>
        </header>
        <form id="asset-form">
          <div class="grid">
            <label for="category">
              Category
              <select id="category" name="category_id" required>
                <option value="">Select a category</option>
              </select>
            </label>
          </div>
          <div class="grid">
            <label for="value">
              Value
              <input type="number" id="value" name="value" step="0.01" min="0.01" required />
            </label>
            <label for="quantity">
              Quantity
              <input type="number" id="quantity" name="quantity" step="0.01" min="0.01" required />
            </label>
          </div>
          <label for="acquisition_date">
            Acquisition Date
            <input type="date" id="acquisition_date" name="acquisition_date" required />
          </label>
          <div class="grid">
            <button type="submit" id="submit-button">Add Asset</button>
            <button type="button" id="cancel-button" class="secondary">Cancel</button>
          </div>
        </form>
      </article>
    `;

		this.innerHTML = this.#template;
		this.loadCategories();
	}

	/**
	 * Load categories for the dropdown
	 */
	async loadCategories(): Promise<void> {
		try {
			this.#categories = await getAllCategories();
			this.populateCategoryDropdown();
		} catch (error) {
			console.error("Failed to load categories:", error);
		}
	}

	/**
	 * Populate the category dropdown with available categories
	 */
	populateCategoryDropdown(): void {
		const select = this.querySelector<HTMLSelectElement>("#category");
		if (!select) return;

		// Keep the first option and add categories
		const defaultOption = select.options[0];
		select.innerHTML = "";
		select.appendChild(defaultOption);

		for (const category of this.#categories) {
			const option = document.createElement("option");
			option.value = category.id.toString();
			option.textContent = category.name;
			select.appendChild(option);
		}
	}

	/**
	 * Handle form submission
	 */
	#onSubmit = async (event: Event): Promise<void> => {
		event.preventDefault();

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		// Update asset object with form values
		this.#asset = {
			category_id: Number(formData.get("category_id")),
			value: Number(formData.get("value")),
			quantity: Number(formData.get("quantity")),
			acquisition_date: new Date(formData.get("acquisition_date") as string),
		};

		if (!validateAsset(this.#asset)) {
			alert("Please fill all required fields correctly.");
			return;
		}

		try {
			const createdAsset = await createAsset(this.#asset);
			if (createdAsset) {
				// Navigate to assets list on success
				navigate("assets");
			} else {
				alert("Failed to create asset. Please try again.");
			}
		} catch (error) {
			console.error("Error creating asset:", error);
			alert("An error occurred while creating the asset.");
		}
	};

	/**
	 * Handle cancel button click
	 */
	#onCancel = (): void => {
		navigate("assets");
	};

	connectedCallback(): void {
		this.#formElement = this.querySelector<HTMLFormElement>("#asset-form");
		this.#categorySelect = this.querySelector<HTMLSelectElement>("#category");
		this.#valueInput = this.querySelector<HTMLInputElement>("#value");
		this.#quantityInput = this.querySelector<HTMLInputElement>("#quantity");
		this.#acquisitionDateInput =
			this.querySelector<HTMLInputElement>("#acquisition_date");
		this.#submitButton =
			this.querySelector<HTMLButtonElement>("#submit-button");
		this.#cancelButton =
			this.querySelector<HTMLButtonElement>("#cancel-button");

		if (this.#formElement) {
			this.#formElement.addEventListener("submit", this.#onSubmit);
		}

		if (this.#cancelButton) {
			this.#cancelButton.addEventListener("click", this.#onCancel);
		}
	}

	disconnectedCallback(): void {
		if (this.#formElement) {
			this.#formElement.removeEventListener("submit", this.#onSubmit);
		}

		if (this.#cancelButton) {
			this.#cancelButton.removeEventListener("click", this.#onCancel);
		}
	}
}
