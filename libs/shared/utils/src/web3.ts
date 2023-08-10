import { mainnet } from 'wagmi/chains';

import type { Chain } from 'wagmi';

export const isEqualAddresses = (
  address: string,
  addressToBeCompared: string,
) => address.toLowerCase() === addressToBeCompared.toLowerCase();

export const getBlockExplorerUrl = (chain: Chain) =>
  chain?.blockExplorers?.['etherscan'] ?? mainnet.blockExplorers.default;
