import { chainId } from 'wagmi';

export const metaVaultEndpoints: Record<number, string> = {
  [chainId.goerli]: process.env['NX_THE_GRAPH_MV_GOERLI_URL'],
};
