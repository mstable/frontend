import { splitEvery } from 'ramda';
import BigNumber from 'bignumber.js';
import { PoolLogicAbi } from '@dhedge/core-ui-kit/abi';
import { BN, formatToUsd, normalizeNumber } from '@dhedge/core-ui-kit/utils';

import { useAccount, useContractReads } from '@dhedge/core-ui-kit/hooks/web3';
import { VAULT_CONFIGS } from '@frontend/shared-constants';
import { formatUnits } from '@dhedge/core-ui-kit/utils';

import { useUserStakedVaults } from './useUserStakedVaults';
import {
  DEFAULT_POLLING_INTERVAL,
  DEFAULT_PRECISION,
  Zero,
} from '@dhedge/core-ui-kit/const';
import { Address } from '@dhedge/core-ui-kit/types';
import { useMemo } from 'react';

interface UseUserVaultBalanceConfig {
  address: Address;
}

interface UserVaultBalance {
  rawBalance: string;
  balance: string;
  balanceInUsd: string;
  balanceInUsdNumber: number;
  includesStakedTokens: boolean;
}

const DEFAULT_BALANCE = {
  rawBalance: Zero.toString(),
  balance: Zero.toString(),
  balanceInUsd: formatToUsd({ value: 0 }),
  balanceInUsdNumber: 0,
  includesStakedTokens: false,
};

export const useUserVaultBalance = (config: UseUserVaultBalanceConfig) => {
  const { account } = useAccount();
  // TODO: enable staked balance
  // const stakedVaults = useUserStakedVaults();

  const { data } = useContractReads({
    contracts: VAULT_CONFIGS.flatMap(({ address, chainId }) => [
      {
        address,
        abi: PoolLogicAbi,
        functionName: 'balanceOf',
        chainId,
        args: [account],
      },
      {
        address,
        abi: PoolLogicAbi,
        functionName: 'tokenPrice',
        chainId,
        args: [],
      },
    ]),
    enabled: !!account,
    staleTime: DEFAULT_POLLING_INTERVAL,
    // TODO Resolve watch re-renders
    // watch: true,
  });

  return useMemo(() => {
    if (!data) {
      return DEFAULT_BALANCE;
    }

    const chunkedData = splitEvery(2, data);
    const balanceMap = VAULT_CONFIGS.reduce<Record<Address, UserVaultBalance>>(
      (acc, product, i) => {
        // const stakedBalance = stakedVaults?.find(
        //   ({ address }) => address === product.address,
        // );
        const [balance, price] = chunkedData?.[i] ?? [BN.from(0), BN.from(0)];

        // const stakedAmountString = stakedBalance?.amount ?? '0';
        const stakedAmountString = '0';
        const balanceString = balance?.toString() ?? '0';
        const priceString = price?.toString() ?? '0';

        const totalBalance = new BigNumber(stakedAmountString)
          .plus(balanceString)
          .toFixed();

        const formattedBalance = formatUnits(totalBalance, DEFAULT_PRECISION);
        const formattedPrice = normalizeNumber(priceString);
        const balanceInUsdNumber = new BigNumber(formattedBalance)
          .multipliedBy(formattedPrice)
          .toNumber();

        const balanceOptions = {
          rawBalance: totalBalance,
          balance: formatUnits(totalBalance),
          balanceInUsd: formatToUsd({ value: balanceInUsdNumber }),
          balanceInUsdNumber,
          // includesStakedTokens: !!stakedBalance,
          includesStakedTokens: false,
        };

        if (balanceInUsdNumber > 0) {
          acc[product.address] = balanceOptions;
        }

        return acc;
      },
      {},
    );

    return balanceMap[config.address] ?? DEFAULT_BALANCE;
  }, [data, config.address]);
};
