import type { Category } from "@/server/domain/category.type";
import type { Role } from "@/server/domain/role.type";
import type { Tool } from "@/server/domain/tool.type";
import type { Raw } from "@/server/shared/sql.type";
import { create, drop, insert, readCommands } from "@/server/shared/sql.utils";

// Read the SQL commands for the tables from the JSON files
const usersSql = await readCommands("users");
const rolesSql = await readCommands("roles");
const toolsSql = await readCommands("tools");
const categoriesSql = await readCommands("categories");
const assetsSql = await readCommands("assets");

// Define a type for the category seed data
type CategorySeed = {
	name: string;
	risk: string;
	liquidity: string;
};

/**
 * Initializes the database
 */
export const initializeTables = async (): Promise<void> => {
	initializeUsersTable();
	initializeRolesTable();
	initializeToolsTable();
	initializeCategoriesTable();
	initializeAssetsTable();
};

const initializeUsersTable = (): void => {
	drop(usersSql.TABLE);
	create(usersSql.CREATE_TABLE);
};

const initializeRolesTable = (): void => {
	drop(rolesSql.TABLE);
	create(rolesSql.CREATE_TABLE);
	seedRoles();
};

const seedRoles = (): void => {
	for (const role of rolesSql.SEED) {
		insert<Role>(rolesSql.INSERT, role as Role);
	}
};

const initializeToolsTable = (): void => {
	drop(toolsSql.TABLE);
	create(toolsSql.CREATE_TABLE);
	seedTools();
};

const seedTools = (): void => {
	for (const tool of toolsSql.SEED) {
		insert<Tool>(toolsSql.INSERT, tool as Tool);
	}
};

const initializeCategoriesTable = (): void => {
	drop(categoriesSql.TABLE);
	create(categoriesSql.CREATE_TABLE);
	seedCategories();
};

const seedCategories = (): void => {
	for (const category of categoriesSql.SEED) {
		const categorySeed = category as CategorySeed;
		const categoryData = {
			name: categorySeed.name,
			risk: categorySeed.risk,
			liquidity: categorySeed.liquidity,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		} as Raw<Category>;

		insert<Category>(categoriesSql.INSERT, categoryData);
	}
};

const initializeAssetsTable = (): void => {
	drop(assetsSql.TABLE);
	create(assetsSql.CREATE_TABLE);
};
