# How to Develop in frontend repository

## Environment setup

It is recommended to develop on UNIX-based system or WSL for Windows.

You need 

- `node16`
- `yarn`

The `i18n:compile` script relies on external dependency `jq` that you need to install on your OS

```bash
# on Ubuntu
sudo apt-get update
sudo apt-get install jq
```

### Optional

You can install Nx cli globally to avoid to have to run all commands through yarn or npx

```bash
npm i -g nx
```

You can create a `.env.local` file to override defaults with your own credentials. Possible variables are

- `NX_CLOUD_ACCESS_TOKEN`: allows pushing local build files to nx cloud
- `NX_THE_GRAPH_MV_MAINNET_URL`: TheGraph endpoint for mainnet Meta Vault subgraph
- `NX_THE_GRAPH_MV_GOERLI_URL`: TheGraph endpoint for goerli Meta Vault subgraph
- `NX_INFURA_API_KEY`: use your own infura api key

## Nx

This repository was generated using [Nx](https://nx.dev). We strongly recomend the reading of the documentation as it follows closely Nx conventions regarding code structure.

> 👌 Nx provides IDE extensions to integrate better with cli
>
> - [NxConsole plugin](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) for VsCode
> - [NxConsole Idea](https://plugins.jetbrains.com/plugin/15101-nx-console-idea) for Jetbrains

## Internationalization

The applications or libraries containing `react-intl` text constants can declare a `i18n-extract` target in their `project.json`. It must emit the extracted translations to `i18n-extractions` folder.

```json
{
  // ...
  "targets": {
    //...
    "i18n-extract": {
      "executor": "nx:run-commands",
      "options": {
        "commands": [
          "yarn run formatjs extract 'APP-OR-LIB-PATH/**/*.{ts,tsx}' --out-file i18n-extractions/APP-OR-LIB-PATH.json --id-interpolation-pattern '[sha512:contenthash:base64:6]'"
        ]
      }
    },
  }
}
```

The applications can consume those files at build time by using the `i18n-compile` target in their build dependencies:

- It leverages the nx dependency graph to build only required translations
- It aggregates all files in `i18n-extractions` folder into one json file located in `apps/MY-APP/i18n/en.json`
- It compiles the translation files to `apps/MY-APP/src/assets/lang/en.json`

## Nx generators

To ease up the creation of a new library or a new application, we use 2 custom generators. You can call them directly through cli

```bash
# creates a new application in the apps folder
yarn nx generate @frontend/tools-nx-plugin:mstable-aplication my-app
# creates a new lib in the libs/shared folder
yarn nx generate @frontend/tools-nx-plugin:mstable-library my-lib --directory=shared
```

or use the NX plugin in your IDE. They are under `generate > @frontend/tools-nx-plugin`

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

## Resources

- [Nx reference](https://nx.dev/reference)
- [Mui](https://mui.com/material-ui/)
