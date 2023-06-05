import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import type {
  TokenPriceHistoryQuery,
  TokenPriceHistoryQueryVariables,
} from '@frontend/shared-types';
import { dHedgeApiEndpoint } from '@frontend/shared-constants';
import { fetcher } from './fetcher';

export const tokenPriceHistoryQueryDocument = `
  query tokenPriceHistoryQuery($address: String!, $period: String!) {
    tokenPriceHistory(address: $address, period: $period) {
      history {
        adjustedTokenPrice
        timestamp
        tokenPrice
        performance
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
      dHedgeApiEndpoint,
      {},
      tokenPriceHistoryQueryDocument,
      variables,
    ),
    options,
  );
