/**
 * Response DTO for asset operations
 */
export type AssetResponse = {
	id: number;
	category_id: number;
	category_name: string;
	value: number;
	quantity: number;
	acquisition_date: string;
	user_id: number;
	created_at: string;
	updated_at: string;
};
