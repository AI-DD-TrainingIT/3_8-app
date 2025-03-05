import { AppError } from "../shared/app-error.class";
import type { Raw } from "../shared/sql.type";

/**
 * Category in the database representing asset classifications based on risk and liquidity.
 */
export type Category = {
	id: number;
	name: string;
	risk: "Low" | "Medium" | "High";
	liquidity: "Low" | "Medium" | "High";
	created_at?: Date;
	updated_at?: Date;
};

/**
 * Null category.
 */
export const NULL_CATEGORY: Category = {
	id: 0,
	name: "",
	risk: "Medium",
	liquidity: "Medium",
	created_at: new Date(),
	updated_at: new Date(),
};

/**
 * Validates a category
 * @param category - The category to validate
 * @throws AppError if the category is invalid
 */
export const validateCategory = (category: Raw<Category>): void => {
	if (!category.name) {
		throw new AppError("Category name is required", "LOGIC");
	}

	const validRiskLevels = ["Low", "Medium", "High"];
	if (!validRiskLevels.includes(category.risk)) {
		throw new AppError(
			"Invalid risk level. Must be 'Low', 'Medium', or 'High'",
			"LOGIC",
		);
	}

	const validLiquidityLevels = ["Low", "Medium", "High"];
	if (!validLiquidityLevels.includes(category.liquidity)) {
		throw new AppError(
			"Invalid liquidity level. Must be 'Low', 'Medium', or 'High'",
			"LOGIC",
		);
	}
};
