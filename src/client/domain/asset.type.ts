/**
 * Represents an investment asset in the client domain
 */
export type Asset = {
	id: number;
	category_id: number;
	value: number;
	quantity: number;
	acquisition_date: Date;
	user_id: number;
	created_at: Date;
	updated_at: Date;
};

/**
 * Default empty asset object
 */
export const NULL_ASSET: Asset = {
	id: 0,
	category_id: 0,
	value: 0,
	quantity: 0,
	acquisition_date: new Date(),
	user_id: 0,
	created_at: new Date(),
	updated_at: new Date(),
};

/**
 * Validates an asset
 * @param asset - The asset to validate
 * @returns true if valid, false otherwise
 */
export const validateAsset = (asset: Partial<Asset>): boolean => {
	if (!asset.category_id || asset.category_id <= 0) return false;
	if (!asset.value || asset.value <= 0) return false;
	if (!asset.quantity || asset.quantity <= 0) return false;
	if (!asset.acquisition_date) return false;
	return true;
};
