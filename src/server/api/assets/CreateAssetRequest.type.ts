/**
 * Request DTO for creating a new asset
 */
export type CreateAssetRequest = {
	category_id: number;
	value: number;
	quantity: number;
	acquisition_date: string; // ISO date string format YYYY-MM-DD
};
