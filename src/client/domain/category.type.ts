/**
 * Represents a classification for assets
 */
export type Category = {
	id: number;
	name: string;
	description: string;
	created_at: Date;
	updated_at: Date;
};

/**
 * Default empty category object
 */
export const NULL_CATEGORY: Category = {
	id: 0,
	name: "",
	description: "",
	created_at: new Date(),
	updated_at: new Date(),
};

/**
 * Validates a category
 * @param category - The category to validate
 * @returns true if valid, false otherwise
 */
export const validateCategory = (category: Partial<Category>): boolean => {
	if (!category.name || category.name.trim() === "") return false;
	return true;
};
