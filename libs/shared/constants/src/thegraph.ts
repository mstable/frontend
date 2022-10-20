import { chainId } from 'wagmi';

// TODO update endpoints when available
export const metaVaultEndpoints: Record<number, string> = {
  [chainId.mainnet]: process.env['NX_THE_GRAPH_MV_MAINNET_URL'],
  [chainId.goerli]: process.env['NX_THE_GRAPH_MV_GOERLI_URL'],
};
