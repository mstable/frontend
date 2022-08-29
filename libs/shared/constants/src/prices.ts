import type { ChainName } from '@wagmi/core/dist/declarations/src/constants/chains';

export const coingeckoEndpoint = 'https://api.coingecko.com/api/v3';

export const coingeckoCoinIds: Partial<Record<ChainName, string>> = {
  polygon: 'matic-network',
  mainnet: 'ethereum',
};
