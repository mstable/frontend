import { Address } from '@dhedge/core-ui-kit/types';
import { useAccount } from '@dhedge/core-ui-kit/hooks/web3';
import { useAllFundsByInvestorQuery } from '../queries';
import {
  formatNumberToLimitedDecimals,
  isEqualAddresses,
} from '@frontend/shared-utils';
import { formatUnits } from '@dhedge/core-ui-kit/utils';

interface UseUserVaultInvestmentInfoConfig {
  address: Address;
}

export const useUserVaultInvestmentInfo = ({
  address,
}: UseUserVaultInvestmentInfoConfig) => {
  const { account } = useAccount();
  const { data, isLoading } = useAllFundsByInvestorQuery(
    { address: account },
    { enabled: !!account },
  );
  const returnOnInvestment = data?.allFundsByInvestor.find(({ fundAddress }) =>
    isEqualAddresses(fundAddress, address),
  );

  return {
    isLoading,
    formattedRoi: returnOnInvestment?.returnOnInvestment
      ? formatNumberToLimitedDecimals(
          (+formatUnits(returnOnInvestment?.returnOnInvestment) - 1) * 100,
          2,
        )
      : '0',
    formattedRoiUsd: returnOnInvestment?.roiUsd
      ? formatNumberToLimitedDecimals(formatUnits(returnOnInvestment.roiUsd), 2)
      : '0',
    roi: returnOnInvestment?.returnOnInvestment,
    roiUsd: returnOnInvestment?.roiUsd,
  };
};
