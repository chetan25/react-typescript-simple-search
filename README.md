---
title: Simple search drop down implemented with hook and Typescript..
excerpt: Simple Search component build with react hook, typescript and webpack.
Tools: ['React', 'Webpack', 'Typescript']
---


# Simple search drop down implemented with hook and Typescript.

Saw a neat implementation of a simple react search drop down based on hooks so thought will give it a try with some Typescripts flavour and webpack.

### The Approach
Created the following components - 
- Input component to get user input.
- Simple Dropdown component to display the results.
- A hook to toggle the open/close state for the dropdown.

The real fun is the hook component that is generic and returns a element ref, state and a function to setState. The ref is generic based on the type which is passed.

The hook is called inside the Input component and we assign a wrapper element to the ref to toggle the visible state.

### Local Development
`npm ci`
`npm start`

### Typescript with Webpack

- Typescript and @babel/preset-typescript will help us convert our code to JavaScript but fork-ts-checker-webpack-plugin is key. This will do type checking for you and will fail builds. Without this Webpack will bundle your project without checking types.
- Adding 'fork-ts-checker-webpack-plugin' is optional.
- The Webpack configuration file is JavaScript-based as standard. However, we can use TypeScript if we install a package called ts-node

#### The typescript config used

- lib: The standard typing to be included in the type checking process. In our case, we have chosen to use the types for the browser’s DOM and the latest version of ECMAScript.
- allowJs: Whether to allow JavaScript files to be compiled.
- allowSyntheticDefaultImports: This allows default imports from - modules with no default export in the type checking process.
- skipLibCheck: Whether to skip type checking of all the type declaration files (*.d.ts).
- esModuleInterop: This enables compatibility with Babel.
- strict: This sets the level of type checking to very high. When this is true, the project is said to be running in strict mode.
- forceConsistentCasingInFileNames: Ensures that the casing of referenced file names is consistent during the type checking process.
- moduleResolution: How module dependencies get resolved, which is node for our project.
- resolveJsonModule: This allows modules to be in .json files which are useful for configuration files.
- noEmit: Whether to suppress TypeScript generating code during the compilation process. This is true in our project because Babel will be generating the JavaScript code.
- jsx: Whether to support JSX in .tsx files.
- include: These are the files and folders for TypeScript to check. In our project, we have specified all the files in the src folder.


#### Babel plugins installed:
- @babel/core: As the name suggests, this is the core Babel library.
- @babel/preset-env: This is a collection of plugins that allow us to use the latest JavaScript features but still target browsers that don’t support them.
- @babel/preset-react: This is a collection of plugins that enable Babel to transform React code into JavaScript.
- @babel/preset-typescript: This is a plugin that enables Babel to transform TypeScript code into JavaScript.
- @babel/plugin-transform-runtime and @babel/runtime: These are plugins that allow us to use the async and await JavaScript features.
- We need a Webpack plugin, babel-loader, to allow Babel to transpile the React and TypeScript code into JavaScript.

#### Webpack configuration used
- `mode` field tells Webpack whether the app needs to be bundled for production or development. We are configuring Webpack for development, so we have set this to "development". Webpack will automatically set process.env.NODE_ENV to "development" which means we get the React development tools included in the bundle.
- `output.public` field tells Webpack what the root path is in the app. This is important for deep linking in the dev server to work properly.
- `entry` field tells Webpack where to start looking for modules to bundle. In our project, this is index.tsx.
- `module` field tells Webpack how different modules will be treated. Our project is telling Webpack to use the babel-loader plugin to process files with .js, .ts, and .tsx extensions.
- `resolve.extensions` field tells Webpack what file types to look for in which order during module resolution. We need to tell it to look for TypeScript files as well as JavaScript files.
- `HtmlWebpackPlugin` creates the HTML file. We have told this to use our index.html in the src folder as the template.
- `HotModuleReplacementPlugin and devServer.hot` allow modules to be updated while an application is running, without a full reload.
- `devtool` field tells Webpack to use full inline source maps. This allows us to debug the original code before transpilation.
- `devServer` field configures the Webpack development server. We tell Webpack that the root of the webserver is the build folder, and to serve files on port 4000. historyApiFallback is necessary for deep links to work in multi-page apps. We are also telling Webpack to open the browser after the server has been started.

*** typings-for-css-modules-loader is a drop-in replacement for css-loader that generates typings for CSS on the fly. *** 