import { ok } from "@server/shared/response.utils";
import type { CategoryResponse } from "./CategoryResponse.type";
import { selectAllCategories } from "./categories.repository";

/**
 * Routes controller for /api/categories
 * - GET: Get all categories
 * @description Object that wires the request to the correct controller
 */
export const categoriesRoutes = {
	GET: async (request: Request) => await getCategories(request),
};

/**
 * Get all categories
 */
const getCategories = async (request: Request): Promise<Response> => {
	const categories = selectAllCategories();
	const categoryResponses: CategoryResponse[] = categories.map((category) => ({
		id: category.id,
		name: category.name,
		risk: category.risk,
		liquidity: category.liquidity,
	}));

	return ok<CategoryResponse[]>(categoryResponses);
};
