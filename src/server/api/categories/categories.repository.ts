import type { Category } from "@server/domain/category.type";
import { readCommands, selectAll, selectById } from "@server/shared/sql.utils";

const categoriesSql = await readCommands("categories");

/**
 * Selects all categories
 * @returns The categories array
 */
export const selectAllCategories = (): Category[] => {
	const results = selectAll<Category>(categoriesSql.SELECT_ALL);
	return results || [];
};

/**
 * Selects a category by id
 * @param id - The id of the category
 * @returns The category
 * @throws AppError if the category is not found
 */
export const selectCategoryById = (id: number): Category => {
	const result = selectById<Category>(categoriesSql.SELECT_BY_ID, id);
	return result;
};
