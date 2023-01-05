# Meta Vault Subgraph

We rely on [The Graph](https://thegraph.com/) to gather on-chain data and consume them in an easy way in the frontend. We have published the [Meta Vault Subgraph](https://thegraph.com/studio/subgraph/mstable-meta-vaults/) in order to keep track of all historicized metrics we need.

The monorepo contains the code for generating and deploying this Subgraph, all the code is located in `libs/subgraph` folder.

## Authentication

You need access to the deploy token in order to deploy or publish the subgraphes. You can pass it to the deploy command by adding the `--deploy-key <TOKEN>` flag.

> You can run `yarn graph auth` to authenticate locally and skip token argument. For simplicity, we'll assume that you are logged in this document.

## Templates

In order to deploy the subgraph to different networks, we use the template pattern described [in the documentation](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/#using-subgraph-yaml-template). It means that before building or publishing the subgraph, we need to generate the files by combining the `config` and the `templates`:

```bash
# available networks are mainnet and goerli
nx prepare subgraph --network=<NETWORK>
```

## Build

Once files are generated, we call the cli to build types and `wasm` files

```bash
nx build subgraph
```

## Deploy

To deploy the subgraph from your local environment, you need to call the `graph deploy` command and pass the subgraph names

- mainnet: `mstable-meta-vaults`
- goerli: `mstable-metavault-goerli`

```bash
yarn graph deploy --studio <SUBGRAPH STUDIO NAME> -o ./libs/subgraph/build ./libs/subgraph/subgraph.yaml
```

You will be prompt for the version number, you need to increment it following [semantic versioning](https://semver.org/) rules.

### Example for mainnet

```bash
nx prepare subgraph --network=mainnet
nx build subgraph
yarn graph deploy --studio mstable-meta-vaults -o ./libs/subgraph/build ./libs/subgraph/subgraph.yaml
```

## Use latest version

Update the env variable `NX_THE_GRAPH_MV_MAINNET_URL` on `.env` or `.env.local` to use the latest url. Note that `dev` or `PR` deploys will use the versions defined in env file, while main PROD deploy will use the endpoints from Github secrets. Don't forget to update them when releasing to live channel.

>❗Publish a new Subgraph version causes TheGraph to immediately archive the previous subgraph.
> Most of the time, you want to wait until the new version finishes to index before starting to consume it in the app.
> Unarchive the old subgraph version on subgraph studio to keep previous version's url working.
