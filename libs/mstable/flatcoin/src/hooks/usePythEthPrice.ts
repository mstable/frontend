import { useQuery } from '@tanstack/react-query';
import { baseGoerli } from 'wagmi/chains';

import type { UseQueryOptions } from '@tanstack/react-query';

type QueryType = 'price' | 'txData';
interface FetchPriceFeedParams {
  type: QueryType;
  chainId: number;
}
interface Props<T>
  extends Pick<UseQueryOptions<T>, 'onSuccess' | 'enabled'>,
    FetchPriceFeedParams {}

const getApiUrl = (chainId: number) => {
  switch (chainId) {
    case baseGoerli.id:
      return 'https://xc-testnet.pyth.network';
    default:
      return 'https://xc-mainnet.pyth.network';
  }
};

// You can find the ids of prices at https://pyth.network/developers/price-feed-ids#pyth-evm-testnet
const getPriceId = (chainId: number) => {
  switch (chainId) {
    case baseGoerli.id:
      return '0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6'; // ETH/USD price id in testnet
    default:
      return '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace'; // ETH/USD price id in mainnet
  }
};

const fetchPriceFeed = async ({ type, chainId }: FetchPriceFeedParams) => {
  const response = await fetch(
    `${getApiUrl(chainId)}/api/${
      type === 'price' ? 'latest_price_feeds' : 'latest_vaas'
    }?ids[]=${getPriceId(chainId)}`,
  );
  return await response.json();
};

export function usePythEthPrice<T>({
  type,
  onSuccess,
  enabled,
  chainId,
}: Props<T>) {
  return useQuery<T>(
    ['priceFeed', type, getPriceId(chainId)],
    () => fetchPriceFeed({ type, chainId }),
    { onSuccess, enabled },
  );
}
