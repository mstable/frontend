import { dHedgeApiEndpoint } from '@frontend/shared-constants';
import { useQuery } from '@tanstack/react-query';

import type { UseQueryOptions } from '@tanstack/react-query';

import type { FundQuery, FundQueryVariables } from './types';

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
