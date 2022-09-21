import { chainId } from 'wagmi';

export const coingeckoEndpoint = 'https://api.coingecko.com/api/v3';

export const coingeckoCoinIds: Record<number, string> = {
  [chainId.polygon]: 'matic-network',
  [chainId.mainnet]: 'ethereum',
  [chainId.goerli]: 'ethereum',
};
