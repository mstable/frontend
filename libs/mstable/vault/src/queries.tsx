import { dHedgeApiEndpoint } from '@frontend/shared-constants';
import { fetcher } from '@frontend/shared-utils';
import { useQuery } from '@tanstack/react-query';

import type { UseQueryOptions } from '@tanstack/react-query';

import type { FundQuery, FundQueryVariables } from './types';

export const fundQueryDocument = `
  query fundQuery($address: String!) {
    fund(address: $address) {
      name
      address
      managerLogicAddress
      tokenPrice
      totalValue
      totalSupply
      performanceFeeNumerator
      streamingFeeNumerator
      entryFeeNumerator
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
