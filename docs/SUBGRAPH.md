# Meta Vault Subgraph

We use [TheGraph](https://thegraph.com/) to easily consume on-chain data in the frontend. To keep track of all the historicized metrics we need, we've published the [Meta Vault Subgraph](https://thegraph.com/studio/subgraph/mstable-meta-vaults/).

The code for generating and deploying this subgraph is located in the libs/subgraph folder of our monorepo.

## Authentication

To deploy or publish the subgraphs, you'll need access to the deploy token. You can pass it to the deploy command by adding the `--deploy-key <TOKEN> flag`. Alternatively, you can authenticate locally with `yarn graph auth`. For simplicity, we'll assume you're already logged in for the rest of this document.

## Templates

We use the template pattern described in the documentation to deploy the subgraph to different networks. Before building or publishing the subgraph, we need to generate the files by combining the config and the templates. To do this, run the following command:

```bash
# available networks are mainnet and goerli
nx prepare subgraph --network=<NETWORK>
```

## Build

Once the files are generated, we call the CLI to build the types and `wasm` files:

```bash
nx build subgraph
```

## Deploy

To deploy the subgraph from your local environment, use the `graph deploy` command and pass the subgraph names:

- mainnet: `mstable-meta-vaults`
- goerli: `mstable-metavault-goerli`

```bash
yarn graph deploy --studio <SUBGRAPH STUDIO NAME> -o ./libs/subgraph/build ./libs/subgraph/subgraph.yaml
```

You'll be prompted for the version number, which you should increment following [semantic versioning](https://semver.org/) rules.

### Example for mainnet

```bash
nx prepare subgraph --network=mainnet
nx build subgraph
yarn graph deploy --studio mstable-meta-vaults -o ./libs/subgraph/build ./libs/subgraph/subgraph.yaml
```

## Use latest version

Update the env variable `NX_THE_GRAPH_MV_MAINNET_URL` in `.env` or `.env.local` to use the latest URL. Note that `dev` or `PR` deploys will use the versions defined in the env file, while the main production deploy will use the endpoints from Github secrets. Don't forget to update them when releasing to the live channel.

> ❗Publishing a new subgraph version causes The Graph to immediately archive the previous version. In most cases, you should wait until the new version finishes indexing before starting to consume it in the app. To keep the previous version's URL working, unarchive the old subgraph version on Subgraph Studio.
