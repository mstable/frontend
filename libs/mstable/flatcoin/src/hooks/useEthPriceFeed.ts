import { useQuery } from '@tanstack/react-query';

import type { UseQueryOptions } from '@tanstack/react-query';

type QueryType = 'price' | 'txData';
interface Props<T> extends Pick<UseQueryOptions<T>, 'onSuccess' | 'enabled'> {
  type: QueryType;
}

const fetchPriceFeed = async (type: QueryType) => {
  // TODO: use for mainnet
  // TODO: move to constants
  // const response = await fetch(
  //   `https://xc-mainnet.pyth.network/api/${
  //     type === 'price' ? 'latest_price_feeds' : 'latest_vaas'
  //   }?ids[]=0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace`,
  // );
  const response = await fetch(
    `https://xc-testnet.pyth.network/api/${
      type === 'price' ? 'latest_price_feeds' : 'latest_vaas'
    }?ids[]=0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6`,
  );
  return await response.json();
};

export function useEthPriceFeed<T>({ type, onSuccess, enabled }: Props<T>) {
  return useQuery<T>(
    [
      type,
      'priceFeed',
      '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
    ],
    () => fetchPriceFeed(type),
    { onSuccess, enabled },
  );
}
