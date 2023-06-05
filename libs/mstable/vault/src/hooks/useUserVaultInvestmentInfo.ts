import { useAccount } from '@dhedge/core-ui-kit/hooks/web3';
import { formatUnits } from '@dhedge/core-ui-kit/utils';
import { isEqualAddresses } from '@frontend/shared-utils';

import { useAllFundsByInvestorQuery } from '../queries';
import { useVault } from '../state';

export const useUserVaultInvestmentInfo = () => {
  const { account } = useAccount();
  const { config } = useVault();
  const { data, isLoading } = useAllFundsByInvestorQuery(
    { address: account },
    { enabled: !!account },
  );
  const returnOnInvestment = data?.allFundsByInvestor.find(({ fundAddress }) =>
    isEqualAddresses(fundAddress, config.address),
  );

  return {
    isLoading,
    formattedRoi: returnOnInvestment?.returnOnInvestment
      ? (+formatUnits(returnOnInvestment?.returnOnInvestment) - 1) * 100
      : 0,
    formattedRoiUsd: returnOnInvestment?.roiUsd
      ? +formatUnits(returnOnInvestment.roiUsd)
      : 0,
    roi: returnOnInvestment?.returnOnInvestment,
    roiUsd: returnOnInvestment?.roiUsd,
  };
};
