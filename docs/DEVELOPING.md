# Developing in the Frontend Repository

## Environment setup

For optimal development experience, it is recommended to use a UNIX-based system or WSL for Windows. Before getting started, make sure you have the following installed:

- `node16`
- `yarn`

Additionally, the i18n:compile script relies on an external dependency called `jq`. To install it, run the following command:

```bash
# For Ubuntu
sudo apt-get update
sudo apt-get install jq
```

### Environment variables

You can create a .env.local file to override the default credentials with your own. Run the following command to create the file:

```bash
cp .env .env.local
```

Here are the environment variables you can set:

- `NX_CLOUD_ACCESS_TOKEN`: Allows you to push local build files to nx cloud.
- `NX_THE_GRAPH_MV_MAINNET_URL`: TheGraph endpoint for mainnet Meta Vault subgraph.
- `NX_THE_GRAPH_MV_GOERLI_URL`: TheGraph endpoint for Goerli Meta Vault subgraph.
- `NX_INFURA_API_KEY`: Your own Infura API key.

## Nx

This repository was generated using [Nx](https://nx.dev). We strongly recommend reading the documentation, as it follows Nx conventions regarding code structure.

> 💡 Nx provides IDE extensions to integrate better with CLI:
>
> - [NxConsole plugin](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) for VsCode
> - [NxConsole Idea](https://plugins.jetbrains.com/plugin/15101-nx-console-idea) for JetBrains

## Internationalization

Applications or libraries containing react-intl text constants can declare an `i18n-extract` target in their `project.json`. This target should emit the extracted translations to the `i18n-extractions` folder.

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

Applications can consume those files at build time by using the `i18n-compile` target in their build dependencies. This target:

- Leverages the nx dependency graph to build only required translations.
- Aggregates all files in the `i18n-extractions` folder into one JSON file located in `apps/MY-APP/i18n/en.json`.
- Compiles the translation files to `apps/MY-APP/src/assets/lang/en.json`.

> ❗When generating the translation files locally, empty out the `i18n-extractions` folder before i18n compiling task. 

## Linting and Code Style

We use ESLint along with a selection of plugins and configs to enforce code style rules. Many of these rules have fixers to automatically correct issues, but there may be some cases where manual intervention is required.

Note that the established rules may be added to or amended later on if changes are found to be beneficial or needed for future updates.

### Run lint

To run ESLint:

```bash
yarn lint
```

### Fixing Lint Issues

```bash
yarn lint:fix
```

> We use Husky, lint-staged, and Prettier to run formatting tasks automatically on pre-commit hooks, so you don't need to run these commands manually.

## Resources

- [Nx reference](https://nx.dev/reference)
- [Mui](https://mui.com/material-ui/)
