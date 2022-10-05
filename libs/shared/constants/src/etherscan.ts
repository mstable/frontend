import { chainId } from 'wagmi';

export const etherscanApiEndpoints: Record<number, string> = {
  [chainId.mainnet]: 'https://api.etherscan.io',
  // HACK: testnet does not have gas tracker module
  [chainId.goerli]: 'https://api.etherscan.io',
};
