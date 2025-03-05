# API Plan for **1 - add_asset**

## Plan Preparation

This plan ensures API structure, endpoints, and types for the `1 - add_asset` feature.

Before implementing the plan, read the preconditions below.

### Documentation references

Read the following reference documentation to be used during implementation:

- [Project System Architecture](/docs/systems.blueprint.md)
- [Project Data model](/docs/data-model.blueprint.md)
- [Feature](/docs/1-add_asset/1-add_asset.blueprint.md)
- [Server API Rules](/.cursor/rules/server-api.mdc)
- [Server API Controller Rules](/.cursor/rules/server-api-controller.mdc)  
- [Server API Repository Rules](/.cursor/rules/server-api-repository.mdc)
- [Server Domain Entity Rules](/.cursor/rules/server-domain-entity.mdc)
- [Request Utils](/src/server/shared/request.utils.ts)
- [SQL Utils](/src/server/shared/sql.utils.ts)
- [Response Utils](/src/server/shared/response.utils.ts)
- [API Error Types](/src/server/shared/api-error.type.ts)

### Bill of materials

#### Resources

- `assets`: Manages investor assets with CRUD operations, focusing on creation for this feature
- `categories`: Provides read-only access to asset categories for selection during asset creation

#### DTOs

For `assets`:
- `CreateAssetRequest`: Request body for creating a new asset
  - `category_id: number` - ID of the selected category
  - `value: number` - Monetary value of the asset
  - `quantity: number` - Quantity of the asset
  - `acquisition_date: string` - Date when the asset was acquired (ISO format)
- `AssetResponse`: Response body for asset operations
  - `id: number` - Unique identifier
  - `category_id: number` - Associated category ID
  - `category_name: string` - Name of the category
  - `value: number` - Monetary value 
  - `quantity: number` - Quantity of the asset
  - `acquisition_date: string` - Acquisition date in ISO format
  - `user_id: number` - ID of the asset owner
  - `created_at: string` - Creation timestamp
  - `updated_at: string` - Last update timestamp

For `categories`:
- `CategoryResponse`: Response for category information
  - `id: number` - Unique identifier
  - `name: string` - Category name
  - `risk: string` - Risk level (Low, Medium, High)
  - `liquidity: string` - Liquidity level (Low, Medium, High)

#### Endpoints

For `assets`:
- `POST /api/assets`: Create a new asset
  - Request: `CreateAssetRequest`
  - Response: `AssetResponse`
  - Errors: 400 (Invalid input), 401 (Unauthorized), 500 (Server error)

For `categories`:
- `GET /api/categories`: Get all available categories
  - Request: None
  - Response: `CategoryResponse[]`
  - Errors: 401 (Unauthorized), 500 (Server error)

## Plan implementation tasks

### 1. API Resources folder structure

#### Instructions and references

Follow the structure defined in [Server API Rules](/.cursor/rules/server-api.mdc).

#### Tasks

- [x] Create or update the `/src/server/api` folder with the API resources
- [x] Create folder `assets`
- [x] Create folder `categories`

### 2. API Repository files

#### Instructions and references

Follow the [Server API Repository Rules](/.cursor/rules/server-api-repository.mdc).

#### Tasks

- [x] Create repository `assets.repository.ts`
  - [x] Add SQL commands import and read commands
  - [x] Import domain types and validation
  - [x] Implement data access functions with Raw type
  - [x] Add domain validation calls
- [x] Create repository `categories.repository.ts`
  - [x] Add SQL commands import and read commands
  - [x] Import domain types and validation
  - [x] Implement data access functions with Raw type
  - [x] Add domain validation calls

### 3. API DTOs

#### Instructions and references

Follow the DTO generation guidelines in [Server API Controller Rules](/.cursor/rules/server-api-controller.mdc).

#### Tasks

- [x] Go to `/src/server/api/assets/` folder
  - [x] Create DTO `CreateAssetRequest.type.ts`
  - [x] Create DTO `AssetResponse.type.ts`
- [x] Go to `/src/server/api/categories/` folder
  - [x] Create DTO `CategoryResponse.type.ts`

### 4. API Controllers

#### Instructions and references

Follow the [Server API Controller Rules](/.cursor/rules/server-api-controller.mdc).

#### Tasks

- [x] Go to `/src/server/api/assets/` folder
- [x] Create controller `assets.controller.ts`
  - [x] Import request/response utils
  - [x] Import domain and DTO types
  - [x] Import repository functions
  - [x] Implement type-safe controllers
  - [x] Add proper type mappings
- [x] Go to `/src/server/api/categories/` folder
- [x] Create controller `categories.controller.ts`
  - [x] Import request/response utils
  - [x] Import domain and DTO types
  - [x] Import repository functions
  - [x] Implement type-safe controllers
  - [x] Add proper type mappings

### 5. Update API Configuration

#### Instructions and references

Update the API routes configuration in the main API controller.

#### Tasks

- [x] Update `/src/server/api/api.controller.ts`
- [x] Import `assetsRoutes` from controller
- [x] Add routes to `apiRoutes` object
- [x] Import `categoriesRoutes` from controller
- [x] Add routes to `apiRoutes` object

_End of API Plan for 1 - add_asset_ 