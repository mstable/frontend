import { useEffect, useState } from 'react';

import { erc4626ABI } from '@frontend/shared-constants';
import { useDataSource } from '@frontend/shared-data-access';
import { BigDecimal } from '@frontend/shared-utils';
import { constants } from 'ethers';
import produce from 'immer';
import { createContainer } from 'react-tracked';
import { useDebounce } from 'react-use';
import {
  erc20ABI,
  useAccount,
  useBalance,
  useContractRead,
  useContractReads,
  useToken,
} from 'wagmi';

import { useUserVaultBalanceQuery } from './queries.generated';

import type { Metavault } from '@frontend/shared-constants';
import type { Children } from '@frontend/shared-utils';
import type { FetchTokenResult } from '@wagmi/core';
import type { BigNumber } from 'ethers';
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

export type SupportedOperation = 'deposit' | 'mint' | 'withdraw' | 'redeem';

const DEBOUNCE_TIME = 500; // ms

type OperationsState = {
  amount: BigDecimal | null;
  token: FetchTokenResult | null;
  operation: SupportedOperation;
  preview: BigDecimal | null;
  allowance: BigNumber | null;
  balance: BigDecimal | null;
  tab: 0 | 1;
  needsApproval: boolean;
  isInputLoading: boolean;
  isSubmitLoading: boolean;
  isError: boolean;
};

export const {
  Provider: OperationsProvider,
  useUpdate: useUpdateOperations,
  useTrackedState: useTrackedOperationsState,
} = createContainer<
  OperationsState,
  Dispatch<SetStateAction<OperationsState>>,
  Children
>(() => {
  const { address: walletAddress, isConnected } = useAccount();
  const {
    metavault: { address },
    asset,
    assetToken,
    assetBalance,
    mvBalance,
    assetsPerShare,
    sharesPerAsset,
  } = useMetavault();
  const [state, setState] = useState<OperationsState>({
    amount: null,
    token: assetToken,
    operation: 'deposit',
    preview: null,
    allowance: null,
    balance: null,
    tab: 0,
    needsApproval: false,
    isInputLoading: false,
    isSubmitLoading: false,
    isError: false,
  });

  const { amount, operation, allowance, preview } = state;

  useContractRead({
    addressOrName: asset,
    contractInterface: erc20ABI,
    functionName: 'allowance',
    args: [walletAddress, address],
    enabled: !!asset && isConnected,
    watch: true,
    cacheOnBlock: true,
    onSuccess: (data) => {
      setState(
        produce((draft) => {
          draft.allowance = data as unknown as BigNumber;
        }),
      );
    },
  });

  const { refetch: fetchPreview } = useContractRead({
    addressOrName: address,
    contractInterface: erc4626ABI,
    functionName: {
      deposit: 'previewDeposit',
      mint: 'previewMint',
      withdraw: 'previewWithdraw',
      redeem: 'previewRedeem',
    }[operation],
    args: [amount?.exact],
    enabled: false,
    onSuccess: (data) => {
      setState(
        produce((draft) => {
          draft.preview = data ? new BigDecimal(data) : null;
          draft.isInputLoading = false;
        }),
      );
    },
  });

  useEffect(() => {
    setState(
      produce((draft) => {
        draft.token = assetToken;
      }),
    );
  }, [assetToken]);

  useEffect(() => {
    const amt = operation === 'deposit' ? amount : preview;

    setState(
      produce((draft) => {
        draft.needsApproval =
          ['deposit', 'mint'].includes(operation) &&
          !!amt &&
          !!allowance &&
          amt.exact.gt(allowance);
      }),
    );
  }, [allowance, amount, operation, preview]);

  useEffect(() => {
    if (!amount) {
      setState(
        produce((draft) => {
          draft.preview = null;
          draft.isInputLoading = false;
        }),
      );
    } else {
      setState(
        produce((draft) => {
          draft.isInputLoading = true;
        }),
      );
    }
  }, [amount, fetchPreview, operation]);

  useEffect(() => {
    setState(
      produce((draft) => {
        draft.isError = {
          deposit:
            (amount && assetBalance && amount.exact.gt(assetBalance.exact)) ||
            (preview &&
              assetBalance &&
              sharesPerAsset &&
              preview.exact.gt(assetBalance.exact.mul(sharesPerAsset.exact))),
          mint:
            (preview && assetBalance && preview.exact.gt(assetBalance.exact)) ||
            (amount &&
              assetBalance &&
              sharesPerAsset &&
              amount.exact.gt(assetBalance.exact.mul(sharesPerAsset.exact))),
          redeem:
            (amount && mvBalance && amount.exact.gt(mvBalance.exact)) ||
            (preview &&
              mvBalance &&
              assetsPerShare &&
              preview.exact.gt(mvBalance.exact.mul(assetsPerShare.exact))),
          withdraw:
            (preview && mvBalance && preview.exact.gt(mvBalance.exact)) ||
            (amount &&
              mvBalance &&
              assetsPerShare &&
              amount.exact.gt(mvBalance.exact.mul(assetsPerShare.exact))),
        }[operation];
      }),
    );
  }, [
    amount,
    assetBalance,
    assetsPerShare,
    mvBalance,
    operation,
    preview,
    sharesPerAsset,
  ]);

  useDebounce(
    () => {
      if (amount && operation) {
        fetchPreview();
      }
    },
    DEBOUNCE_TIME,
    [amount, operation, fetchPreview],
  );

  return [state, setState];
});
