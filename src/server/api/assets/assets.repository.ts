import type { Raw } from "@/server/shared/sql.type";
import { type Asset, validateAsset } from "@server/domain/asset.type";
import {
	insert,
	readCommands,
	selectById,
	selectByUserId,
} from "@server/shared/sql.utils";

const assetsSql = await readCommands("assets");

/**
 * Selects all assets for a user
 * @param userId - The ID of the user
 * @returns The assets array
 */
export const selectAssetsByUserId = (userId: number): Asset[] => {
	const results = selectByUserId<Asset>(assetsSql.SELECT_BY_USER_ID, userId);
	return results || [];
};

/**
 * Selects an asset by id
 * @param id - The id of the asset
 * @returns The asset
 * @throws AppError if the asset is not found
 */
export const selectAssetById = (id: number): Asset => {
	const result = selectById<Asset>(assetsSql.SELECT_BY_ID, id);
	return result;
};

/**
 * Inserts an asset
 * @param assetToInsert - The asset to insert
 * @returns The asset inserted
 * @throws AppError if the asset is not valid
 */
export const insertAsset = (assetToInsert: Raw<Asset>): Asset => {
	validateAsset(assetToInsert);
	const assetId = insert<Raw<Asset>>(assetsSql.INSERT, assetToInsert);
	const asset = selectById<Asset>(assetsSql.SELECT_BY_ID, assetId);
	return asset;
};
