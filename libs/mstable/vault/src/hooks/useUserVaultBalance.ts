import { usePoolTokenPrice } from '@dhedge/core-ui-kit/hooks/pool';
import { useUserTokenBalance } from '@dhedge/core-ui-kit/hooks/user';
import { formatToUsd } from '@dhedge/core-ui-kit/utils';
import BigNumber from 'bignumber.js';

import { useVault } from '../state';

export const useUserVaultBalance = () => {
  const { config } = useVault();
  const userVaultBalance = useUserTokenBalance({
    symbol: config.symbol,
    address: config.address,
  });
  const vaultTokenPrice = usePoolTokenPrice({
    address: config.address,
    chainId: config.chainId,
  });

  return {
    userVaultBalance,
    userVaultBalanceInUsd: formatToUsd({
      value: new BigNumber(userVaultBalance || 0)
        .multipliedBy(vaultTokenPrice || 0)
        .toNumber(),
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    }),
  };
};
