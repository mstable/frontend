import { useQuery } from '@tanstack/react-query';

import type { UseQueryOptions } from '@tanstack/react-query';

import type { PriceFeedData } from '../types';

const fetchPriceFeed = async () => {
  const response = await fetch(
    'https://xc-mainnet.pyth.network/api/latest_price_feeds?ids[]=0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
  );
  return await response.json();
};

export const useEthPriceFeed = ({
  onSuccess,
}: Pick<UseQueryOptions<PriceFeedData[]>, 'onSuccess'>) => {
  useQuery<PriceFeedData[]>(
    [
      'priceFeed',
      '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
    ],
    fetchPriceFeed,
    {
      onSuccess,
    },
  );
};
