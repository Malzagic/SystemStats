# Cross-Platform System Monitor

## Overview

This open-source application retrieves system information and real-time metrics about a user's hardware, including:

- **CPU Model**
- **Total RAM**
- **Total Storage Capacity**
- **Real-time Data:**
  - CPU Temperature
  - CPU Usage
  - RAM Usage
  - Storage Usage

It is built using **Electron.js** for cross-platform desktop application support, **React** for the front-end, and **TypeScript** for type safety. The project also uses **Vite** for fast builds and hot module replacement (HMR).

The application is currently in the development phase, and the features and interface are subject to change.

## Technologies

- **Electron.js**
- **React**
- **TypeScript**
- **Vite**
- **ESLint** for linting

## Installation

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Malzagic/SystemStats.git
   ```

2. Navigate to the project directory:

   ```bash
   cd SystemStats
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the application in development mode:
   ```bash
   npm run dev
   ```

This command will handle building and running the React application with Vite and HMR. It will also transpile the Electron code (if needed) and start Electron in development mode.

## Vite Note

This setup uses Vite for fast builds and hot module replacement (HMR). The current configuration uses **Babel** or **SWC** depending on the project needs.

## Expanding the ESLint Configuration

For a production application, consider extending the ESLint configuration for stricter type checks. Here's how:

### Type-Aware ESLint Configuration

Update your top-level `parserOptions` in ESLint:

```js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

Replace the default configuration with stricter options:

```js
tseslint.configs.recommendedTypeChecked;
// or
tseslint.configs.strictTypeChecked;
```

Optionally, add:

```js
...tseslint.configs.stylisticTypeChecked
```

### React-Specific ESLint Configuration

Install the `eslint-plugin-react` and update your ESLint configuration:

```bash
npm install eslint-plugin-react
```

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  settings: {
    react: {
      version: "18.3",
    },
  },
  plugins: {
    react,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

## License

This project is licensed under the MIT License.

## Future Development

The project is actively being developed. Both the user interface and available features may change over time.
