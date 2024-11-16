# Types Folder

This folder contains all the TypeScript type definitions, interfaces, and related types used throughout the application. By centralizing our types here, we ensure consistency and reusability across the codebase.

## Structure

- `apiTypes.ts`: Types related to API requests and responses.
- `componentTypes.ts`: Types and interfaces for component props and state.
- `dataTypes.ts`: General data models used throughout the application.
- `index.ts`: Central export file for all types.

## Files and Their Purpose

### `apiTypes.ts`

This file contains type definitions for API requests and responses. These types help ensure type safety when making API calls and handling their responses.

Example:

```typescript
// Represents the structure of a user returned from the API
export interface ApiUser {
  id: string;
  name: string;
  email: string;
}

// Represents the structure of an error returned from the API
export interface ApiError {
  message: string;
  statusCode: number;
}
```
