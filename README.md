# Electronjs Boilerplate with React + TypeScript + Vite

A boilerplate allowing you to quickly start working with Electron.js, React, TypeScript, and Vite. This template includes minimal configurations to run a React app in Vite, with Hot Module Replacement (HMR) support and ESLint.

## Technologies used in the project

- [Electron.js](https://www.electronjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [ESLint](https://eslint.org/)
- [Babel](https://babeljs.io/) or [SWC](https://swc.rs/) (depending on the configuration)

## Installation Instructions

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Malzagic/Electronjs-boilerplate-with-react-ts-vite.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Electronjs-boilerplate-with-react-ts-vite
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Build the React application:

   ```bash
   npm run build
   ```

   This command will create the `dist-react` folder containing the built React app.

5. Transpile the Electron code:

   ```bash
   npm run transpile:electron
   ```

   This command will create the `dist-electron` folder with the transpiled Electron code.

6. Run the application in development mode:

   ```bash
   npm run dev:electron
   ```

   The application will start in development mode with HMR enabled for React.

## Vite Note:

This template provides a minimal setup to get React working with TypeScript in Vite, along with HMR and some ESLint rules. Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh.

### Expanding the ESLint configuration

If you are developing a production application, it's recommended to update the ESLint configuration to enable type-aware rules:

1. Configure the top-level `parserOptions` property as follows:

   ```js
   export default tseslint.config({
     languageOptions: {
       // other options...
       parserOptions: {
         project: ["./tsconfig.node.json", "./tsconfig.app.json"],
         tsconfigRootDir: import.meta.dirname,
       },
     },
   });
   ```

2. Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`.

3. Optionally, add `...tseslint.configs.stylisticTypeChecked`.

4. Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the configuration:

   ```js
   // eslint.config.js
   import react from "eslint-plugin-react";

   export default tseslint.config({
     // Set the React version
     settings: { react: { version: "18.3" } },
     plugins: {
       // Add the React plugin
       react,
     },
     rules: {
       // other rules...
       // Enable its recommended rules
       ...react.configs.recommended.rules,
       ...react.configs["jsx-runtime"].rules,
     },
   });
   ```

## License

This project is licensed under the MIT License.
