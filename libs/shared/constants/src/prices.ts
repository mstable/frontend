import { goerli, mainnet, polygon } from 'wagmi/chains';

export const coingeckoEndpoint = 'https://api.coingecko.com/api/v3';

export const coingeckoCoinIds: Record<number, string> = {
  [polygon.id]: 'matic-network',
  [mainnet.id]: 'ethereum',
  [goerli.id]: 'ethereum',
};
