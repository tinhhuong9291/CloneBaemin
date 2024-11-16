# Styles Folder

This folder contains all the styling files for the application, including CSS, SCSS, and styled-components. These styles define the visual appearance and layout of the application components.

## Structure

- `global.scss`: Global styles that apply to the entire application.
- `variables.scss`: SCSS variables for colors, fonts, and other design tokens.
- `mixins.scss`: SCSS mixins for reusable styles.
- `components/`: Folder containing component-specific styles.
- `layouts/`: Folder containing layout-specific styles.

## Files and Their Purpose

### `global.scss`

This file contains global styles that apply to the entire application. These styles include resets, base styles, and any global utility classes.

Example:

```scss
/* Reset some default browser styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Body styles */
body {
  font-family: 'Roboto', sans-serif;
  background-color: #f8f9fa;
  color: #212529;
}

/* Utility classes */
.hidden {
  display: none !important;
}
```
