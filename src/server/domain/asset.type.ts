import { AppError } from "../shared/app-error.class";
import type { Raw } from "../shared/sql.type";

/**
 * Asset in the database representing investment assets managed by users.
 */
export type Asset = {
	id: number;
	category_id: number;
	value: number;
	quantity: number;
	acquisition_date: string; // ISO date string format
	user_id: number;
	created_at?: Date;
	updated_at?: Date;
};

/**
 * Null asset.
 */
export const NULL_ASSET: Asset = {
	id: 0,
	category_id: 0,
	value: 0,
	quantity: 0,
	acquisition_date: new Date().toISOString().split("T")[0],
	user_id: 0,
	created_at: new Date(),
	updated_at: new Date(),
};

/**
 * Validates an asset
 * @param asset - The asset to validate
 * @throws AppError if the asset is invalid
 */
export const validateAsset = (asset: Raw<Asset>): void => {
	if (!asset.category_id) {
		throw new AppError("Asset must have a category", "LOGIC");
	}

	if (!asset.user_id) {
		throw new AppError("Asset must be associated with a user", "LOGIC");
	}

	if (asset.value <= 0) {
		throw new AppError("Asset value must be greater than zero", "LOGIC");
	}

	if (asset.quantity <= 0) {
		throw new AppError("Asset quantity must be greater than zero", "LOGIC");
	}

	if (!asset.acquisition_date) {
		throw new AppError("Acquisition date is required", "LOGIC");
	}

	// Validate date format (YYYY-MM-DD)
	const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
	if (!dateRegex.test(asset.acquisition_date)) {
		throw new AppError(
			"Invalid acquisition date format. Use YYYY-MM-DD",
			"LOGIC",
		);
	}
};
