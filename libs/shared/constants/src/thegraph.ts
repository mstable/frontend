import { goerli, mainnet } from 'wagmi/chains';

export const metaVaultEndpoints: Record<number, string> = {
  [mainnet.id]: process.env['NX_THE_GRAPH_MV_MAINNET_URL'],
  [goerli.id]: process.env['NX_THE_GRAPH_MV_GOERLI_URL'],
};
