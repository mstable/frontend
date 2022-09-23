import { useEffect, useState } from 'react';

import { erc4626ABI } from '@frontend/shared-constants';
import { useDataSource } from '@frontend/shared-data-access';
import { BigDecimal } from '@frontend/shared-utils';
import { constants } from 'ethers';
import produce from 'immer';
import { createContainer } from 'react-tracked';
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractReads,
  useToken,
} from 'wagmi';

import { useUserVaultBalanceQuery } from './queries.generated';

import type { Metavault } from '@frontend/shared-constants';
import type { FetchTokenResult } from '@wagmi/core';
import type { Dispatch, SetStateAction } from 'react';

type MetaVaultState = {
  metavault: Metavault | null;
  mvToken: FetchTokenResult | null;
  asset: string | null;
  assetToken: FetchTokenResult | null;
  mvBalance: BigDecimal | null;
  mvDeposited: BigDecimal | null;
  assetBalance: BigDecimal | null;
  assetsPerShare: BigDecimal | null;
  sharesPerAsset: BigDecimal | null;
};

export const {
  Provider: MetavaultProvider,
  useUpdate: useUpdateMetavault,
  useTrackedState: useMetavault,
} = createContainer<
  MetaVaultState,
  Dispatch<SetStateAction<MetaVaultState>>,
  { initialState: { metavault: Metavault } }
>(({ initialState }) => {
  const { address: walletAddress, isConnected } = useAccount();
  const [state, setState] = useState<MetaVaultState>({
    metavault: {
      address: '',
      name: '',
      tags: [],
      strategies: [],
      vaults: [],
      assets: [],
      fees: { liquidation: 0, performance: 0 },
      ...initialState.metavault,
    },
    mvToken: null,
    asset: null,
    assetToken: null,
    mvBalance: null,
    mvDeposited: null,
    assetBalance: null,
    assetsPerShare: null,
    sharesPerAsset: null,
  });

  const {
    metavault: { address },
    asset,
  } = state;

  const dataSource = useDataSource();
  const { refetch: refetchUserVaultBalance } = useUserVaultBalanceQuery(
    dataSource,
    {
      owner: walletAddress,
      vault: address,
    },
    {
      onSuccess: (userVaultBalanceData) => {
        if (userVaultBalanceData) {
          setState(
            produce((draft) => {
              draft.mvDeposited = new BigDecimal(
                userVaultBalanceData.vaultBalances[0]?.assetDeposited ||
                  constants.Zero,
              );
            }),
          );
        }
      },
    },
  );

  useContractRead({
    addressOrName: address,
    contractInterface: erc4626ABI,
    functionName: 'asset',
    enabled: !!address,
    onSuccess: (data) => {
      setState(
        produce((draft) => {
          draft.asset = data as unknown as string;
        }),
      );
    },
  });

  const { refetch: fetchMvToken } = useToken({
    address: address,
    enabled: false,
    onSuccess: (data) => {
      setState(
        produce((draft) => {
          draft.mvToken = data;
        }),
      );
    },
  });

  const { refetch: fetchAssetToken } = useToken({
    address: asset,
    enabled: false,
    onSuccess: (data) => {
      setState(
        produce((draft) => {
          draft.assetToken = data;
        }),
      );
    },
  });

  useBalance({
    addressOrName: walletAddress,
    token: address,
    watch: true,
    enabled: !!walletAddress && !!address,
    onSuccess: (data) => {
      setState(
        produce((draft) => {
          draft.mvBalance = data
            ? new BigDecimal(data.value, data.decimals)
            : BigDecimal.ZERO;
        }),
      );
    },
  });

  useBalance({
    addressOrName: walletAddress,
    token: asset,
    watch: true,
    enabled: !!walletAddress && !!asset,
    onSuccess: (data) => {
      setState(
        produce((draft) => {
          draft.assetBalance = data
            ? new BigDecimal(data.value, data.decimals)
            : BigDecimal.ZERO;
        }),
      );
    },
  });

  useContractReads({
    contracts: [
      {
        addressOrName: address,
        contractInterface: erc4626ABI,
        functionName: 'convertToAssets',
        args: [constants.One],
      },
      {
        addressOrName: address,
        contractInterface: erc4626ABI,
        functionName: 'convertToShares',
        args: [constants.One],
      },
    ],
    allowFailure: true,
    cacheOnBlock: true,
    watch: true,
    enabled: !!address && isConnected,
    onSettled: (data) => {
      setState(
        produce((draft) => {
          draft.assetsPerShare = data?.[0]
            ? new BigDecimal(data[0], 0)
            : BigDecimal.ONE;
          draft.sharesPerAsset = data?.[1]
            ? new BigDecimal(data[1], 0)
            : BigDecimal.ONE;
        }),
      );
    },
  });

  useEffect(() => {
    if (address) {
      fetchMvToken();
    }
  }, [address, fetchMvToken]);

  useEffect(() => {
    if (asset) {
      fetchAssetToken();
    }
  }, [asset, fetchAssetToken]);

  useEffect(() => {
    if (!walletAddress) {
      setState(
        produce((draft) => {
          draft.mvBalance = null;
          draft.assetBalance = null;
          draft.mvDeposited = null;
        }),
      );
    } else {
      refetchUserVaultBalance();
    }
  }, [walletAddress, refetchUserVaultBalance]);

  return [state, setState];
});
