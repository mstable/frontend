import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetcher } from '../fetcher';
import { dHedgeApiEndpoint } from '@frontend/shared-constants';

interface CustomCurrencyRoiVariables {
  vaultAddress: string;
  investorAddress: string;
}

interface CustomCurrencyRoiQuery {
  getYieldPnl: {
    fundAddress: string;
    investorAddress: string;
    yieldBaseAssetPnl: number;
    yieldPercentagePnl: number;
    baseAssetName: string;
  } | null;
}

const customCurrencyRoiQueryDocument = `
  query GetYieldPnl($vaultAddress: String!, $investorAddress: String!) {
    getYieldPnl(fundAddress: $vaultAddress, investorAddress: $investorAddress) {
      investorAddress
      fundAddress
      yieldPercentagePnl
      yieldBaseAssetPnl
      baseAssetName
    }
  }
`;

export const useCustomCurrencyRoiQuery = (
  variables: CustomCurrencyRoiVariables,
  options?: UseQueryOptions<CustomCurrencyRoiQuery, Error>,
) =>
  useQuery<CustomCurrencyRoiQuery, Error>(
    ['getYieldPnl', variables.vaultAddress, variables.investorAddress],
    fetcher<CustomCurrencyRoiQuery, CustomCurrencyRoiVariables>(
      dHedgeApiEndpoint,
      {},
      customCurrencyRoiQueryDocument,
      variables,
    ),
    options,
  );
