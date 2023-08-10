import { dHedgeApiEndpoint } from '@frontend/shared-constants';
import { FundByInvestor } from '@frontend/shared-types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Address } from '@dhedge/core-ui-kit/types';
import { fetcher } from '@frontend/shared-utils';

interface AllFundsByInvestorQueryVariables {
  address: Address;
}

interface AllFundsByInvestorQuery {
  allFundsByInvestor: FundByInvestor[];
}

const allFundsByInvestorQueryDocument = `
  query allFundsByInvestorQuery($address: String!) {
    allFundsByInvestor(investorAddress: $address) {
      returnOnInvestment
      averageEntryPrice
      roiUsd
      fundAddress
    }
  }
`;

export const useAllFundsByInvestorQuery = (
  variables: AllFundsByInvestorQueryVariables,
  options?: UseQueryOptions<AllFundsByInvestorQuery, Error>,
) =>
  useQuery<AllFundsByInvestorQuery, Error>(
    ['allFundsByInvestor', variables.address],
    fetcher<AllFundsByInvestorQuery, AllFundsByInvestorQueryVariables>(
      dHedgeApiEndpoint,
      {},
      allFundsByInvestorQueryDocument,
      variables,
    ),
    options,
  );
