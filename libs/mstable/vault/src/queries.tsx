import { dHedgeApiEndpoint } from '@frontend/shared-constants';
import { useQuery } from '@tanstack/react-query';

import type { UseQueryOptions } from '@tanstack/react-query';

import type {
  FundQuery,
  FundQueryVariables,
  TokenPriceHistoryQuery,
  TokenPriceHistoryQueryVariables,
} from './types';

function fetcher<TData, TVariables>(
  endpoint: string,
  requestInit: RequestInit,
  query: string,
  variables?: TVariables,
) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}

export const fundQueryDocument = `
  query fundQuery($address: String!) {
    fund(address: $address) {
      name
      address
      managerLogicAddress
      tokenPrice
      totalValue
      totalSupply
      managerFeeNumerator
      blockTime
      riskFactor
      performanceMetrics {
        day
        week
        month
        quarter
        halfyear
        year
      }
      isPrivate
      fundComposition {
        tokenName
        tokenAddress
        amount
        rate
        isDeposit
        precision
        asset {
          iconSymbols
        }
      }
      apy {
        monthly
        weekly
      }
    }
  }
`;

export const useFundQuery = (
  variables: FundQueryVariables,
  options?: UseQueryOptions<FundQuery, Error>,
) =>
  useQuery<FundQuery, Error>(
    ['fund', variables.address],
    fetcher<FundQuery, FundQueryVariables>(
      dHedgeApiEndpoint,
      {},
      fundQueryDocument,
      variables,
    ),
    options,
  );

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
