import { goerli, mainnet } from 'wagmi/chains';

export const etherscanApiEndpoints: Record<number, string> = {
  [mainnet.id]: 'https://api.etherscan.io',
  // HACK: testnet does not have gas tracker module
  [goerli.id]: 'https://api.etherscan.io',
};
