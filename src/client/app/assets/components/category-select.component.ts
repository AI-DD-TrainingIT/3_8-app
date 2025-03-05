import type { Category } from "@/client/domain/category.type";
import { getAllCategories } from "@/client/repositories/category.repository";

const html = String.raw;

/**
 * Component for selecting categories
 * Usage: <category-select></category-select>
 */
export class CategorySelectComponent extends HTMLElement {
	#template: string;
	#categories: Category[] = [];
	#selectedCategoryId = 0;
	#selectElement: HTMLSelectElement | null = null;

	constructor() {
		super();

		this.#template = html`
      <div>
        <select id="category-select" name="category_id" required>
          <option value="">Select a category</option>
        </select>
      </div>
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
			this.populateDropdown();
		} catch (error) {
			console.error("Failed to load categories:", error);
		}
	}

	/**
	 * Populate the dropdown with available categories
	 */
	populateDropdown(): void {
		const select = this.querySelector<HTMLSelectElement>("#category-select");
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
	 * Get the selected category ID
	 */
	get selectedCategoryId(): number {
		return this.#selectedCategoryId;
	}

	/**
	 * Set the selected category ID
	 */
	set selectedCategoryId(value: number) {
		this.#selectedCategoryId = value;

		// Update the dropdown selection
		const select = this.querySelector<HTMLSelectElement>("#category-select");
		if (select && value > 0) {
			select.value = value.toString();
		}
	}

	/**
	 * Handle category selection change
	 */
	#onChange = (event: Event): void => {
		const select = event.target as HTMLSelectElement;
		this.#selectedCategoryId = Number(select.value);

		// Dispatch custom event when selection changes
		this.dispatchEvent(
			new CustomEvent("category-selected", {
				detail: { categoryId: this.#selectedCategoryId },
				bubbles: true,
			}),
		);
	};

	connectedCallback(): void {
		this.#selectElement =
			this.querySelector<HTMLSelectElement>("#category-select");

		if (this.#selectElement) {
			this.#selectElement.addEventListener("change", this.#onChange);
		}
	}

	disconnectedCallback(): void {
		if (this.#selectElement) {
			this.#selectElement.removeEventListener("change", this.#onChange);
		}
	}
}
