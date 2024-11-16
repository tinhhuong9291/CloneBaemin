# Actions Folder

This folder contains server-side actions that are used throughout the application. Each file is responsible for a specific set of actions.

## Structure

- `userActions.ts`: Actions related to user management such as fetching user details, creating, and deleting users.
- `fileActions.ts`: Actions related to file management such as uploading, downloading, and deleting files.

## Naming Conventions

- Files are named using camelCase to indicate their purpose clearly.
- Functions within each file are named using descriptive verbs.

## Usage

Each action is an async function that interacts with the server or database. Make sure to handle exceptions and errors appropriately when calling these functions.
