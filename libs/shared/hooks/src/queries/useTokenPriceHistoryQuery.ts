import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import type {
  TokenPriceHistoryQuery,
  TokenPriceHistoryQueryVariables,
} from '@frontend/shared-types';
import { DHEDGE_API_ENDPOINT } from '@frontend/shared-constants';
import { fetcher } from '@frontend/shared-utils';

export const tokenPriceHistoryQueryDocument = `
  query tokenPriceHistoryQuery($address: String!, $period: String!) {
    tokenPriceHistory(address: $address, period: $period) {
      history {
        adjustedTokenPrice
        timestamp
      }
    }
  }
`;

export const useTokenPriceHistoryQuery = (
  variables: TokenPriceHistoryQueryVariables,
  options?: UseQueryOptions<TokenPriceHistoryQuery, Error>,
) =>
  useQuery<TokenPriceHistoryQuery, Error>(
    ['tokenPriceHistory', variables.address, variables.period],
    fetcher<TokenPriceHistoryQuery, TokenPriceHistoryQueryVariables>(
      DHEDGE_API_ENDPOINT,
      {},
      tokenPriceHistoryQueryDocument,
      variables,
    ),
    options,
  );
