<br/>
<img src="https://mstable.org/assets/img/email/mstable_logo_horizontal_black.png" width="420" >

<br />

# mStable Frontend

This repository contains the latest frontend applications of mStable. It is a monorepo comprising multiple mStable apps, all built using common libraries and a common UI.

## Apps

The following table lists the mStable apps included in this repository

| Status | Name              | Nx project | Port | Public hosts                                            |
| ------ | ----------------- | ---------- | ---- | ------------------------------------------------------- |
| ✅     | Meta Vaults       | `mstable`  | 4200 | [Google Cloud](https://yield.mstable.org/)              |
| 🚧 Dev | Long Term Support | `lts`      | 4201 | [Google Cloud](https://apps-lts--dev-vite2x32.web.app/) |

## Quickstart
To get started with this repository, run the following commands:

```bash
git clone https://github.com/mstable/frontend.git
cd frontend
yarn
```
If you encounter any issues during the installation process, please refer to the [environment setup guide](./DEVELOPING.md#environment-setup).

### Running an app

```bash
yarn nx serve mstable
yarn nx serve lts
```

### Building an app

```bash
yarn nx run build mstable
yarn nx run build lts
```

## Developing

For detailed instructions and information on local development, please refer to the [Developing Guide](./docs/DEVELOPING.md).

## Contributing

If you would like to contribute to this repository, please refer to the [Contributing Guide](./docs/CONTRIBUTING.md).

## Subgraph

To learn more about our Meta Vault Subgraph, please refer to the [Meta Vault Subgraph](./docs/SUBGRAPH.md).

## Contact us

If you have any questions or concerns, please join our [Discord server](https://discordapp.com/channels/525087739801239552/).
