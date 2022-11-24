import { useEffect, useState } from 'react';

import { useDataSource } from '@frontend/mstable-shared-data-access';
import { BigDecimal } from '@frontend/shared-utils';
import { constants } from 'ethers';
import produce from 'immer';
import { createContainer } from 'react-tracked';
import {
  erc4626ABI,
  useAccount,
  useBalance,
  useContractRead,
  useContractReads,
  useToken,
} from 'wagmi';

import {
  useMetavaultQuery,
  useUserVaultBalanceQuery,
} from './queries.generated';

import type { Metavault } from '@frontend/shared-constants';
import type { HexAddress } from '@frontend/shared-utils';
import type { FetchTokenResult } from '@wagmi/core';
import type { BigNumberish } from 'ethers';
import type { Dispatch, SetStateAction } from 'react';

type MetaVaultState = {
  metavault: Metavault | null;
  mvToken: FetchTokenResult | null;
  asset: HexAddress | null;
  assetToken: FetchTokenResult | null;
  mvBalance: BigDecimal | null;
  mvBalanceInAsset: BigDecimal | null;
  mvDeposited: BigDecimal | null;
  profitOrLoss: BigDecimal | null;
  assetBalance: BigDecimal | null;
  assetBalanceInShare: BigDecimal | null;
  roi: number | null;
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
    mvBalanceInAsset: null,
    mvDeposited: null,
    profitOrLoss: null,
    assetBalance: null,
    assetBalanceInShare: null,
    roi: null,
  });

  const {
    metavault: { address, firstBlock },
    asset,
  } = state;

  const dataSource = useDataSource();
  useUserVaultBalanceQuery(
    dataSource,
    {
      owner: walletAddress,
      vault: address,
    },
    {
      enabled: !!address && !!walletAddress && !!state.mvBalanceInAsset,
      refetchInterval: 15000,
      onSuccess: (userVaultBalanceData) => {
        if (userVaultBalanceData) {
          setState(
            produce((draft) => {
              const mvDeposited = new BigDecimal(
                userVaultBalanceData.vaultBalances[0]?.assetDeposited ||
                  constants.Zero,
              );
              draft.mvDeposited = mvDeposited;
              draft.profitOrLoss = draft.mvBalanceInAsset.sub(mvDeposited);
            }),
          );
        }
      },
    },
  );

  useMetavaultQuery(
    dataSource,
    { id: address, firstBlock },
    {
      onSuccess: (data) => {
        setState(
          produce((draft) => {
            draft.roi =
              data?.vault?.assetPerShare /
                (data?.vault?.first?.[0]?.assetPerShare ?? 1) -
                1 ?? 0;
          }),
        );
      },
    },
  );

  useContractRead({
    address,
    abi: erc4626ABI,
    functionName: 'asset',
    enabled: !!address,
    onSuccess: (data) => {
      setState(
        produce((draft) => {
          draft.asset = data as HexAddress;
        }),
      );
    },
  });

  const { refetch: fetchMvToken } = useToken({
    address,
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
    address: walletAddress,
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
    address: walletAddress,
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
        address,
        abi: erc4626ABI,
        functionName: 'convertToAssets',
        args: [state.mvBalance?.exact],
      },
      {
        address,
        abi: erc4626ABI,
        functionName: 'convertToShares',
        args: [state.assetBalance?.exact],
      },
    ],
    allowFailure: true,
    cacheOnBlock: true,
    watch: true,
    enabled:
      !!address &&
      isConnected &&
      !!state.mvBalance &&
      !!state.assetToken &&
      !!state.assetBalance &&
      !!state.mvToken,
    onSettled: (data) => {
      setState(
        produce((draft) => {
          draft.mvBalanceInAsset = data?.[0]
            ? new BigDecimal(data[0] as BigNumberish, state.assetToken.decimals)
            : BigDecimal.ZERO;
          draft.assetBalanceInShare = data?.[1]
            ? new BigDecimal(data[1] as BigNumberish, state.mvToken.decimals)
            : BigDecimal.ZERO;
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
    setState(
      produce((draft) => {
        draft.mvBalance = null;
        draft.mvBalanceInAsset = null;
        draft.assetBalance = null;
        draft.assetBalanceInShare = null;
        draft.mvDeposited = null;
        draft.profitOrLoss = null;
      }),
    );
  }, [walletAddress]);

  return [state, setState];
});
