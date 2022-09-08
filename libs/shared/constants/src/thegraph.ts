import { isDev } from '@frontend/shared-utils';
import { chainId } from 'wagmi';

export const metaVaultEndpoints: Record<number, string> = {
  [chainId.goerli]: isDev
    ? 'https://api.studio.thegraph.com/query/32034/mstable-metavault-goerli/v0.1.0'
    : `https://api.studio.thegraph.com/query/${process.env['NX_THE_GRAPH_MV_GOERLI_API_KEY']}/mstable-metavault-goerli/v0.1.0`,
};
