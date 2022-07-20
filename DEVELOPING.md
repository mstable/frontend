# How to Develop in frontend repository

This project was generated using [Nx](https://nx.dev). We strongly recomend the reading of the documentation as it follows closely Nx conventions regarding code structure.

> 👌 Nx provides IDE extensions to integrate better with cli
>
> - [NxConsole plugin](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) for VsCode
> - [NxConsole Idea](https://plugins.jetbrains.com/plugin/15101-nx-console-idea) for Jetbrains

## Monorepo structure

### Two primary folders

- `apps`: configure dependency injection and wire up libraries. They should not contain any
  components, services, or business logic. The best way to consider if something is an app is to ask if project can be deployed standalone.
- `libs`: contain services, components, utilities, etc. They have well-defined public API that lives in in
  dex.ts barrel file. When organizing libraries you should think about your business domains.

The apps folder contains:

- 1 sub-folder per application
- 1 sub-folder per e2e test application

The libs folder contains:

- 1 sub-folder per application containing application specific modules and optionally an app-scoped shared folder
- 1 shared folder to contain all common libraries. Shared libs should not call any product-specific api

### How to split code between apps and libs

👍 Rule of the thumb

- place 80% of your logic into the `libs/` folder
- and 20% into `apps/`

### Library types

We use library types proposed by Nx: https://nx.dev/structure/library-types. Naming convention is to use kebab-case for all libraries.

- **Feature libraries**:
  - shared globally or application-scoped
  - implement business logic
  - can use other features, data-access, ui and utils libs
- **UI libraries**:
  - shared globally or application-scoped
  - contain shared dumb presentational components
  - can only use other ui and utils libs
- **Data-access libraries**:
  - shared globally
  - contain clients, generated types and hooks for api communication
  - can only use other data-access and utils libs
- **Utility libraries**:
  - shared globally
  - contain helpers and utility collections
  - can only use other utils libs

### Constraints

Following constraints apply to libs and apps:

- `app` can only depend on `libs` but not other `apps`
- feature cannot depend on `app` but can depend on any other `lib`
- shared libs can only depend on other shared libs
- shared libs should not call any product-specific api
- ui libs can only depend on other ui libs
- everyone can depend on util including util itself

## Feature library structure

We propose this convention of file naming and organization within a feature library:

```
- <module-name>
  - src
    - index // main barrel file
    - constants // constant values
    - routes // internal routing
    - state // internal state
    - hooks // public or internal hooks
    - selectors // derived state selectors
    - types // common typings
    - fragments // graphQL fragments
    - queries // graphQL queries
    - mutations // graphQL mutations
    - \*.generated // generated types and hooks
    - \*.test // tests for the above
    - fixtures // test fixture mocks

    - components // folder containing your components
      - <ModuleName>Provider // context provider
      - <ModuleComponent> // additional components
      - \*.test // components tests

    - views // folder containing your route views
      - Main // main view Outlet
      - <ModuleView> // additional views
```

Try to stick as much as possible to this naming so it becomes easy to navigate in the repo and now where to find which elements.

The rationale for the components/views split is regarding whether or not the components is accessible through routing. All components instantiated by routes should be placed in views, others should be placed in components. Usually, views are only present at the root folder, they are not nested.

## Nx generators

To ease up the creation of a new library or a new application, we use 2 custom generators. You can call them directly through cli

```bash
# creates a new application in the apps folder
yarn nx generate @frontend/tools-nx-plugin:mstable-aplication my-app
# creates a new lib in the libs/shared folder
yarn nx generate @frontend/tools-nx-plugin:mstable-library my-lib --directory=shared
```

They will take care of creating a ready-to-use folder containing all necessary configuration files and integrate with typescript monorepo aliases.

> ❗Always use the generators to create new `apps` or `libs`

## Linting and Code Style

This repository has been set up to use ESLint along with a selection of plugins and configs which it and/or overrides certain rules for our use cases. For the most part these rules allow for automatic warning (or errors) when writing code in a way that strays from the intended code style. Many of these rules have fixers which help with cleaning up any issues that are reported, but there may be some more complex cases
where you need to manually fix the offending code.

As a side note: The rules that have been established and combined with the presets from Nx, may be added to or amended later on if those changes are found to be beneficial or needed for future updates.

### Run lint

```bash
yarn lint
```

### Fix lint

```bash
yarn lint:fix
```

> We use husky, lint-staged and prettier to automatically run formatting tasks on pre-commit hook, so you should have have to run those commands manually.

## IDE setup

It is recommended to use IDE support to automatically run formatting tasks on save or on format

### VS Code

The following VS Code configuration settings are helpful in setting up both auto-fixing ESLint issues and formatting based on Prettier. You would need both Prettier and ESLint VS Code extensions for both of these to work. Some of these settings are not directly related to auto-fixing and formatting, but rather settings found to be helpful in general. These can be added directly in your user settings.json file.

```json
{
 ...
 "editor.codeActionsOnSave": { "source.fixAll.eslint": true },
 "editor.defaultFormatter": "esbenp.prettier-vscode",
 "editor.formatOnPaste": true,
 "editor.formatOnSave": true,
 "editor.formatOnType": true,
 "eslint.alwaysShowStatus": true,
 "eslint.options": {
  "extensions": [".js", ".jsx", ".mdx", ".ts", ".tsx"]
 },
 "eslint.packageManager": "yarn",
 "eslint.validate": [
  "javascript",
  "javascriptreact",
  "mdx",
  "typescript",
  "typescriptreact"
 ],
 ...
}
```

### Jetbrains

Just as VS Code, there are a few places you need to update in your preferences in IntelliJ.

- First go to Preferences > Tools > Actions on Save and make sure the following checkboxes are selected:
  - `Run eslint --fix`
  - `Run prettier`
- Then hover over the `Run eslint --fix` option and click on the link that says `Configure...`
  - On that screen set the radio button to Automatic ESLint configuration and make sure the following is in the “Run for files” input: `{\*_/_,\*}.{js,ts,jsx,tsx,mdx}`.

## Resources

- [Very good article](https://nx.dev/structure/applications-and-libraries) concerning folder structure and organization
- [Mui](https://mui.com/material-ui/)
