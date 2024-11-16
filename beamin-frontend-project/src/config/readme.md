# Config Folder

This folder contains configuration files and settings for the project. These configurations help in setting up various aspects of the application, such as environment variables, database connections, third-party service integrations, and other project-specific settings.

## Structure

- `env.ts`: Manages environment-specific variables.
- `dbConfig.ts`: Contains database connection settings.
- `apiConfig.ts`: Holds configuration for API endpoints and keys.
- `appConfig.ts`: General application configuration settings.

## Files and Their Purpose

### `env.ts`

This file is responsible for loading and managing environment-specific variables. It ensures that sensitive information such as API keys, database passwords, etc., are not hard-coded but instead managed through environment variables.

Example:

```javascript
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  API_KEY: process.env.API_KEY,
};
```
