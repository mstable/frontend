import { baseGoerli } from 'wagmi/chains';

export const SUPPORTED_FLATCOIN_CHAINS = [baseGoerli];
export const SUPPORTED_FLATCOIN_CHAIN_IDS: number[] =
  SUPPORTED_FLATCOIN_CHAINS.map(({ id }) => id);
