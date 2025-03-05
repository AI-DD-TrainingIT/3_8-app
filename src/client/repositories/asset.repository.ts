import type { Asset } from "@/client/domain/asset.type";
import { validateAsset } from "@/client/domain/asset.type";
import { get, post } from "@/client/shared/fetch.utils";
import type { Result } from "@/client/shared/result.type";

const BASE_URL = "/api/assets";

/**
 * Get all assets for the authenticated user
 * @returns A promise resolving to an array of assets or an empty array if the request fails
 */
export const getAllAssets = async (): Promise<Asset[]> => {
	const result = await get<Asset[]>(BASE_URL);
	if (result.value) return result.value;
	if (result.error) {
		console.error("Error fetching assets:", result.error);
	}
	return [];
};

/**
 * Get an asset by its ID
 * @param id - The ID of the asset to retrieve
 * @returns A promise resolving to the asset or null if not found
 */
export const getAssetById = async (id: number): Promise<Asset | null> => {
	const result = await get<Asset>(`${BASE_URL}/${id}`);
	if (result.value) return result.value;
	if (result.error) {
		console.error(`Error fetching asset with ID ${id}:`, result.error);
	}
	return null;
};

/**
 * Create a new asset
 * @param asset - The asset data to create
 * @returns A promise resolving to the created asset or null if creation failed
 */
export const createAsset = async (
	asset: Partial<Asset>,
): Promise<Asset | null> => {
	if (!validateAsset(asset)) {
		console.error("Invalid asset data:", asset);
		return null;
	}

	const result = await post<Asset>(BASE_URL, asset);
	if (result.value) return result.value;
	if (result.error) {
		console.error("Error creating asset:", result.error);
	}
	return null;
};

/**
 * Update an existing asset
 * @param id - The ID of the asset to update
 * @param asset - The updated asset data
 * @returns A promise resolving to the updated asset or null if update failed
 */
export const updateAsset = async (
	id: number,
	asset: Partial<Asset>,
): Promise<Asset | null> => {
	if (!validateAsset(asset)) {
		console.error("Invalid asset data:", asset);
		return null;
	}

	const result = await post<Asset>(`${BASE_URL}/${id}`, asset);
	if (result.value) return result.value;
	if (result.error) {
		console.error(`Error updating asset with ID ${id}:`, result.error);
	}
	return null;
};

/**
 * Delete an asset by its ID
 * @param id - The ID of the asset to delete
 * @returns A promise resolving to true if deletion was successful, false otherwise
 */
export const deleteAsset = async (id: number): Promise<boolean> => {
	const result = await post<Result<unknown>>(`${BASE_URL}/delete/${id}`, {});
	if (result.status >= 200 && result.status < 300) return true;
	if (result.error) {
		console.error(`Error deleting asset with ID ${id}:`, result.error);
	}
	return false;
};
