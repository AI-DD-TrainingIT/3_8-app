# SQL Plan for **1 - add_asset**

## Plan Preparation

This plan ensures SQL structure, seeds, commands and entity types for the `1 - add_asset` feature.

Before implementing the plan, read the preconditions below.

### Documentation references

Read the following reference documentation to be used during implementation:

- [Project System Architecture](/docs/systems.blueprint.md)
- [Project Data model](/docs/data-model.blueprint.md)
- [Feature](/docs/1-add_asset/1-add_asset.blueprint.md)
- [SQL Commands Type](/src/server/shared/sql.type.ts)
- [Initialize Utils](/src/server/shared/initialize.utils.ts)
- [SQL utils](/src/server/shared/sql.utils.ts)
- [SQL-Commands JSON rule](/.cursor/rules/sql-commands-json.mdc) 
- [Server domain entity rule](/.cursor/rules/server-domain-entity.mdc)

### Bill of materials

#### Tables

- `users`: Represents investors using the system
  - `id`: Primary key, auto-increment integer
  - `name`: User's full name
  - `email`: User's email address (unique)
  - `password`: Hashed password
  - `created_at`: Timestamp for record creation
  - `updated_at`: Timestamp for record updates

- `categories`: Represents classifications for assets based on risk and liquidity
  - `id`: Primary key, auto-increment integer
  - `name`: Category name (unique)
  - `risk`: Risk level (Low, Medium, High)
  - `liquidity`: Liquidity level (Low, Medium, High)
  - `created_at`: Timestamp for record creation
  - `updated_at`: Timestamp for record updates

- `assets`: Represents investment assets managed by users
  - `id`: Primary key, auto-increment integer
  - `category_id`: Foreign key referencing categories
  - `value`: Decimal value of the asset
  - `quantity`: Integer quantity of the asset
  - `acquisition_date`: Date when the asset was acquired
  - `user_id`: Foreign key referencing users
  - `created_at`: Timestamp for record creation
  - `updated_at`: Timestamp for record updates

#### Seeds

- `categories`: Needs seed data for application to have predefined asset types
  - ```json
    [
      {
        "name": "Real Estate",
        "risk": "Low",
        "liquidity": "Medium"
      },
      {
        "name": "Stock",
        "risk": "Medium",
        "liquidity": "High"
      },
      {
        "name": "Bond",
        "risk": "Medium",
        "liquidity": "Low"
      },
      {
        "name": "Raw Materials",
        "risk": "Medium",
        "liquidity": "Medium"
      },
      {
        "name": "Crypto",
        "risk": "High",
        "liquidity": "High"
      }
    ]
    ```

## Plan implementation tasks

### 1. SQL Commands 

- [x] Create or update the `/src/sql` folder with the SQL commands

- **Rule**: Respect the [SQL-Commands JSON rule](/.cursor/rules/sql-commands-json.mdc)

- [x] Create if not exists a file called `users.sql.json`
- [x] Fill it or update it with the SQL commands
- [x] Create if not exists a file called `categories.sql.json`
- [x] Fill it or update it with the SQL commands
- [x] Add the seed data as an array of objects to the `SEED` property
- [x] Create if not exists a file called `assets.sql.json`
- [x] Fill it or update it with the SQL commands

### 2. Domain Entity types

- [x] Create or update the `/src/server/domain` folder with the domain types
  
- **Rule**: Respect the [Server domain entity rule](/.cursor/rules/server-domain-entity.mdc)

- [x] Create if not exists a file called `user.type.ts`
- [x] Fill it or update it with the domain types, null value and validation function
- [x] Create if not exists a file called `category.type.ts`
- [x] Fill it or update it with the domain types, null value and validation function
- [x] Create if not exists a file called `asset.type.ts`
- [x] Fill it or update it with the domain types, null value and validation function

### 3. Table Initialization functions

Example of desired result:
```typescript
const toolsSql = await readCommands("tools");

export const initializeTables = async (): Promise<void> => {
  // other tables initialization...
  initializeToolsTable();
};

const initializeToolsTable = (): void => {
	drop(toolsSql.TABLE);
	create(toolsSql.CREATE_TABLE);
	seedTools();
};

const seedTools = (): void => {
	for (const tool of toolsSql.SEED) {
		insert<Tool>(toolsSql.INSERT, tool as Raw<Tool>);
	}
};
```

- [x] Create or update the `/src/server/shared/initialize.utils.ts` file 
- [x] Read the sql commands for the table at `const usersSql = await readCommands("users");`
- [x] Create if not exists a function called `initializeUsersTable`
- [x] Read the sql commands for the table at `const categoriesSql = await readCommands("categories");`
- [x] Create if not exists a function called `initializeCategoriesTable`
- [x] Add the seed data function call
- [x] Read the sql commands for the table at `const assetsSql = await readCommands("assets");`
- [x] Create if not exists a function called `initializeAssetsTable`
- [x] Add the table initialization calls to the `initializeTables` function

_End of SQL Plan for 1 - add_asset_ 