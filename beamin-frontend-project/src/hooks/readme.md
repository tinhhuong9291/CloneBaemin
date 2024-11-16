# Hooks Folder

This folder contains custom React hooks that are used throughout the application. These hooks encapsulate reusable logic, making it easier to manage state and side effects in a modular and maintainable way.

## Structure

- `useAuth.ts`: Hook for managing authentication state and logic.
- `useFetch.ts`: Hook for making API requests.
- `useForm.ts`: Hook for managing form state and validation.
- `useDebounce.ts`: Hook for debouncing values.

## Files and Their Purpose

### `useAuth.ts`

This hook manages authentication state and logic. It provides methods for logging in, logging out, and checking the authentication status of the user.

Example:

```typescript
import { useState, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    // Check if user is authenticated
  }, []);

  const login = (username: string, password: string) => {
    // Perform login
  };

  const logout = () => {
    // Perform logout
  };

  return {
    ...authState,
    login,
    logout,
  };
}
```
