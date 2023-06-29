import { Address } from '@dhedge/core-ui-kit/types';
import { useAccount } from '@dhedge/core-ui-kit/hooks/web3';
import {
  useAllFundsByInvestorQuery,
  useCustomCurrencyRoiQuery,
} from '../queries';
import {
  formatNumberToLimitedDecimals,
  isEqualAddresses,
} from '@frontend/shared-utils';
import { formatUnits } from '@dhedge/core-ui-kit/utils';
import { CURRENCY_SYMBOL_MAP } from '@frontend/shared-constants';

interface UseUserVaultInvestmentInfoConfig {
  address: Address;
}

export const useUserVaultInvestmentInfo = ({
  address,
}: UseUserVaultInvestmentInfoConfig) => {
  const { account } = useAccount();
  const { data, isLoading: isRoiLoading } = useAllFundsByInvestorQuery(
    { address: account },
    { enabled: !!account },
  );
  const returnOnInvestment = data?.allFundsByInvestor.find(({ fundAddress }) =>
    isEqualAddresses(fundAddress, address),
  );
  const { data: customRoi, isLoading: isCustomRoiLoading } =
    useCustomCurrencyRoiQuery(
      {
        vaultAddress: address,
        investorAddress: account,
      },
      { enabled: !!account },
    );

  return {
    isRoiLoading: !!account && isRoiLoading,
    isCustomRoiLoading: !!account && isCustomRoiLoading,
    roiInPercentage: returnOnInvestment?.returnOnInvestment
      ? +formatNumberToLimitedDecimals(
          (+formatUnits(returnOnInvestment?.returnOnInvestment) - 1) * 100,
          2,
        )
      : 0,
    roiInUsd: returnOnInvestment?.roiUsd
      ? +formatNumberToLimitedDecimals(
          formatUnits(returnOnInvestment.roiUsd),
          2,
        )
      : 0,
    customRoiInPercentage: customRoi?.getYieldPnl?.yieldPercentagePnl,
    customRoiInCurrency: customRoi?.getYieldPnl?.yieldBaseAssetPnl,
    customRoiCurrencySymbol:
      CURRENCY_SYMBOL_MAP[customRoi?.getYieldPnl?.baseAssetName],
  };
};
