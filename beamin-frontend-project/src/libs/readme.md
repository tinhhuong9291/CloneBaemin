# Libs Folder

This folder contains reusable utility functions, helper libraries, and other shared code that can be used across different parts of the application. By centralizing common logic here, we ensure that our codebase is more modular and easier to maintain.

## Structure

- `dateUtils.ts`: Utilities for handling date and time operations.
- `apiClient.ts`: A wrapper around fetch or axios for making API requests.
- `validation.ts`: Functions for data validation.
- `storage.ts`: Utilities for interacting with localStorage and sessionStorage.
- `types.ts`: Shared TypeScript types and interfaces.

## Files and Their Purpose

### `dateUtils.ts`

This file contains utility functions for handling date and time operations, such as formatting dates, calculating differences, and parsing date strings.

Example:

```typescript
import { format, parseISO, differenceInDays } from 'date-fns';

/**
 * Formats a date string into a readable format.
 * @param date - The date string to format.
 * @param formatStr - The format string.
 * @returns The formatted date string.
 */
export function formatDate(date: string, formatStr: string): string {
  return format(parseISO(date), formatStr);
}

/**
 * Calculates the number of days between two dates.
 * @param startDate - The start date.
 * @param endDate - The end date.
 * @returns The number of days between the dates.
 */
export function calculateDaysBetween(
  startDate: string,
  endDate: string,
): number {
  return differenceInDays(parseISO(startDate), parseISO(endDate));
}
```
