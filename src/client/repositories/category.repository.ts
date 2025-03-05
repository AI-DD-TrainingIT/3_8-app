import type { Category } from "@/client/domain/category.type";
import { get } from "@/client/shared/fetch.utils";

const BASE_URL = "/api/categories";

/**
 * Get all available asset categories
 * @returns A promise resolving to an array of categories or an empty array if the request fails
 */
export const getAllCategories = async (): Promise<Category[]> => {
	const result = await get<Category[]>(BASE_URL);
	if (result.value) return result.value;
	if (result.error) {
		console.error("Error fetching categories:", result.error);
	}
	return [];
};
