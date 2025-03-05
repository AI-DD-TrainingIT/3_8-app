# App Plan for **1 - Add Asset**

## Plan Preparation

This plan ensures client-side structure, components, and types for the `1 - Add Asset` feature.

Before implementing the plan, read the preconditions below.

### Documentation references

Read the following reference documentation to be used during implementation:

- [Project System Architecture](/docs/systems.blueprint.md)
- [Project Data model](/docs/data-model.blueprint.md)
- [Feature](/docs/1-add_asset/1-add_asset.blueprint.md)
- [Client Entity Rules](/.cursor/rules/client-entity.mdc)
- [Client Repository Rules](/.cursor/rules/client-repository.mdc)
- [Client Component Rules](/.cursor/rules/client-component.mdc)
- [Client Page Rules](/.cursor/rules/client-page.mdc)
- [Client Web Rules](/.cursor/rules/client-web.mdc)
- [Fetch Utils](/src/client/shared/fetch.utils.ts)

### Bill of materials

#### Entities

- `Asset`: Represents an investment asset in the client domain
  - `id: number` - Unique identifier for the asset
  - `category_id: number` - Reference to the associated category
  - `value: number` - Monetary value of the asset
  - `quantity: number` - Quantity of assets
  - `acquisition_date: Date` - Date when the asset was acquired
  - `user_id: number` - Reference to the user who owns the asset
  - `created_at: Date` - Creation timestamp
  - `updated_at: Date` - Last update timestamp

- `Category`: Represents a classification for assets
  - `id: number` - Unique identifier for the category
  - `name: string` - Name of the category
  - `description: string` - Description of the category
  - `created_at: Date` - Creation timestamp
  - `updated_at: Date` - Last update timestamp

#### Repositories

- `asset.repository.ts`: Handles API communication for asset-related operations
  - `getAllAssets`: Retrieves all assets for the authenticated user
  - `getAssetById`: Retrieves a specific asset by ID
  - `createAsset`: Creates a new asset record
  - `updateAsset`: Updates an existing asset record
  - `deleteAsset`: Deletes an asset record

- `category.repository.ts`: Handles API communication for category-related operations
  - `getAllCategories`: Retrieves all available asset categories for selection

#### Components

- `asset-form.component.ts`: Component for creating new assets
  - `categoryId`: property for storing selected category
  - `categorySelection`: Dropdown for category selection
  - `valueInput`: Input field for asset value
  - `quantityInput`: Input field for asset quantity
  - `acquisitionDateInput`: Date picker for acquisition date
  - `submitButton`: Button to submit the form
  - `cancelButton`: Button to cancel the operation

- `asset-list.component.ts`: Component for displaying the list of assets
  - `assets`: Property to store retrieved assets
  - `addButton`: Button to navigate to add asset form
  - `refreshButton`: Button to refresh the asset list

- `category-select.component.ts`: Reusable component for category selection
  - `categories`: Property to store available categories
  - `selectedCategoryId`: Property to track selected category

## Plan implementation tasks

### 1. Client Domain Entities

#### Instructions and references

Follow the [Client Entity Rules](/.cursor/rules/client-entity.mdc) for entity type definitions.

#### Tasks

- [x] Create or update the `/src/client/domain` folder with the domain types
- [x] Create file `asset.type.ts`
  - [x] Define the main Asset type
  - [x] Create NULL_ASSET object
  - [x] Add validateAsset function
- [x] Create file `category.type.ts`
  - [x] Define the main Category type
  - [x] Create NULL_CATEGORY object
  - [x] Add validateCategory function

### 2. Client Repositories

#### Instructions and references

Follow the [Client Repository Rules](/.cursor/rules/client-repository.mdc) for API access.

#### Tasks

- [x] Create or update the `/src/client/repositories` folder with the repositories
- [x] Create file `asset.repository.ts`
  - [x] Define BASE_URL constant as "/api/assets"
  - [x] Import fetch utilities and entity types
  - [x] Implement getAllAssets function
  - [x] Implement getAssetById function
  - [x] Implement createAsset function
  - [x] Implement updateAsset function
  - [x] Implement deleteAsset function
  - [x] Add error handling
- [x] Create file `category.repository.ts`
  - [x] Define BASE_URL constant as "/api/categories"
  - [x] Import fetch utilities and entity types
  - [x] Implement getAllCategories function
  - [x] Add error handling

### 3. Client Components

#### Instructions and references

Follow the [Client Component Rules](/.cursor/rules/client-component.mdc) for creating Web Components.

#### Tasks

- [x] Create folder `/src/client/components/asset` if not exists
- [x] Create file `asset-form.component.ts`
  - [x] Extend HTMLElement
  - [x] Create HTML template with form fields (category select, value, quantity, acquisition date)
  - [x] Implement connectedCallback for setup and event listeners
  - [x] Implement disconnectedCallback for cleanup
  - [x] Add event handlers for form submission and cancellation
  - [x] Add validation before submission
  - [x] Implement API calls using the asset repository
- [x] Create file `asset-list.component.ts`
  - [x] Extend HTMLElement
  - [x] Create HTML template with asset list and add button
  - [x] Implement connectedCallback for setup and event listeners
  - [x] Implement disconnectedCallback for cleanup
  - [x] Add loadAssets method to fetch and display assets
  - [x] Add event handlers for refreshing and adding new assets
- [x] Create folder `/src/client/components/category` if not exists
- [x] Create file `category-select.component.ts`
  - [x] Extend HTMLElement
  - [x] Create HTML template with select dropdown
  - [x] Implement connectedCallback for setup and event listeners
  - [x] Implement disconnectedCallback for cleanup
  - [x] Add loadCategories method to fetch and display categories in dropdown
  - [x] Add event handlers for category selection

### 4. Component Registration

#### Instructions and references

Update the component registration file to include new components.

#### Tasks

- [x] Update `/src/client/components/register-components.ts`
- [x] Import `AssetFormComponent` from asset components
- [x] Import `AssetListComponent` from asset components
- [x] Import `CategorySelectComponent` from category components
- [x] Add registration with `customElements.define('asset-form', AssetFormComponent)`
- [x] Add registration with `customElements.define('asset-list', AssetListComponent)`
- [x] Add registration with `customElements.define('category-select', CategorySelectComponent)`

### 5. Navigation Integration

#### Instructions and references

Update navigation to include links to the new asset features.

#### Tasks

- [x] Update navigation component to include asset management links
  - [x] Add "Add Asset" menu item linking to "/assets/add"
  - [x] Add "My Assets" menu item linking to "/assets"
- [x] Create or update `/src/client/pages/assets-add.html` to include the asset-form component
  - [x] Add the asset-form custom element to the page
- [x] Create or update `/src/client/pages/assets.html` to include the asset-list component
  - [x] Add the asset-list custom element to the page

_End of App Plan for 1 - Add Asset_ 