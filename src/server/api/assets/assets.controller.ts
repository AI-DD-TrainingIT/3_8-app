import type { Asset } from "@/server/domain/asset.type";
import { guardGetUserId } from "@/server/shared/request.utils";
import type { Raw } from "@/server/shared/sql.type";
import { ok } from "@server/shared/response.utils";
import { selectCategoryById } from "../categories/categories.repository";
import type { AssetResponse } from "./AssetResponse.type";
import type { CreateAssetRequest } from "./CreateAssetRequest.type";
import { insertAsset, selectAssetsByUserId } from "./assets.repository";

/**
 * Routes controller for /api/assets
 * - GET: Get all assets for the authenticated user
 * - POST: Create a new asset
 * @description Object that wires the request to the correct controller
 */
export const assetsRoutes = {
	GET: async (request: Request) => await getAssets(request),
	POST: async (request: Request) => await postAsset(request),
};

/**
 * Get all assets for the authenticated user
 */
const getAssets = async (request: Request): Promise<Response> => {
	const userId = guardGetUserId(request);
	const assets = selectAssetsByUserId(userId);

	// Map assets to response DTOs with category names
	const assetResponses: AssetResponse[] = assets.map((asset) => {
		const category = selectCategoryById(asset.category_id);
		return mapAssetToResponse(asset, category.name);
	});

	return ok<AssetResponse[]>(assetResponses);
};

/**
 * Create a new asset
 */
const postAsset = async (request: Request): Promise<Response> => {
	const userId = guardGetUserId(request);
	const assetDto = (await request.json()) as CreateAssetRequest;

	// Create the asset with user ID
	const assetToInsert: Raw<Asset> = {
		...assetDto,
		user_id: userId,
	};

	const asset = insertAsset(assetToInsert);
	const category = selectCategoryById(asset.category_id);
	const assetResponse = mapAssetToResponse(asset, category.name);

	return ok<AssetResponse>(assetResponse);
};

/**
 * Maps an asset entity to an asset response DTO
 */
const mapAssetToResponse = (
	asset: Asset,
	categoryName: string,
): AssetResponse => {
	return {
		id: asset.id,
		category_id: asset.category_id,
		category_name: categoryName,
		value: asset.value,
		quantity: asset.quantity,
		acquisition_date: asset.acquisition_date,
		user_id: asset.user_id,
		created_at: asset.created_at?.toISOString() || "",
		updated_at: asset.updated_at?.toISOString() || "",
	};
};
