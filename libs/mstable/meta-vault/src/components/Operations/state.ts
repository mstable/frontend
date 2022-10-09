import { useEffect, useState } from 'react';

import { erc4626ABI } from '@frontend/shared-constants';
import { BigDecimal } from '@frontend/shared-utils';
import produce from 'immer';
import { createContainer } from 'react-tracked';
import { useDebounce } from 'react-use';
import { erc20ABI, useAccount, useContractRead } from 'wagmi';

import { useMetavault } from '../../state';

import type { Children } from '@frontend/shared-utils';
import type { FetchTokenResult } from '@wagmi/core';
import type { BigNumber } from 'ethers';
import type { Dispatch, SetStateAction } from 'react';

import type { SupportedOperation } from '../../types';

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

export const { Provider, useUpdate, useTrackedState } = createContainer<
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
    assetBalanceInShare,
    mvBalance,
    mvBalanceInAsset,
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
              assetBalanceInShare &&
              preview.exact.gt(assetBalanceInShare.exact)),
          mint:
            (preview && assetBalance && preview.exact.gt(assetBalance.exact)) ||
            (amount &&
              assetBalance &&
              assetBalanceInShare &&
              amount.exact.gt(assetBalanceInShare.exact)),
          redeem:
            (amount && mvBalance && amount.exact.gt(mvBalance.exact)) ||
            (preview &&
              mvBalance &&
              mvBalanceInAsset &&
              preview.exact.gt(mvBalanceInAsset.exact)),
          withdraw:
            (preview && mvBalance && preview.exact.gt(mvBalance.exact)) ||
            (amount &&
              mvBalance &&
              mvBalanceInAsset &&
              amount.exact.gt(mvBalanceInAsset.exact)),
        }[operation];
      }),
    );
  }, [
    amount,
    assetBalance,
    assetBalanceInShare,
    mvBalance,
    operation,
    preview,
    mvBalanceInAsset,
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
