import { useEffect, useState } from 'react';

import { BigDecimal } from '@frontend/shared-utils';
import { constants } from 'ethers';
import produce from 'immer';
import { createContainer } from 'react-tracked';
import { useDebounce } from 'react-use';
import {
  erc20ABI,
  erc4626ABI,
  useAccount,
  useContractRead,
  useNetwork,
} from 'wagmi';

import { useMetavault } from '../../state';

import type { Children } from '@frontend/shared-utils';
import type { BigNumber } from 'ethers';
import type { BigNumberish } from 'ethers';
import type { Dispatch, SetStateAction } from 'react';

import type { SupportedOperation } from '../../types';

const DEBOUNCE_TIME = 500; // ms

type OperationsState = {
  amount: BigDecimal | null;
  operation: SupportedOperation;
  preview: BigDecimal | null;
  allowance: BigNumber | null;
  balance: BigDecimal | null;
  assetsPerShare: BigDecimal | null;
  tab: 0 | 1;
  needsApproval: boolean;
  isInputLoading: boolean;
  isSubmitLoading: boolean;
  isError: boolean;
};

const initialState: OperationsState = {
  amount: null,
  operation: 'deposit',
  preview: null,
  allowance: null,
  balance: null,
  assetsPerShare: null,
  tab: 0,
  needsApproval: false,
  isInputLoading: false,
  isSubmitLoading: false,
  isError: false,
};

export const { Provider, useUpdate, useTrackedState } = createContainer<
  OperationsState,
  Dispatch<SetStateAction<OperationsState>>,
  Children
>(() => {
  const { chain } = useNetwork();
  const { address: walletAddress, isConnected } = useAccount();
  const {
    metavault: { address },
    assetToken,
    assetBalance,
    mvToken,
    mvBalance,
  } = useMetavault();
  const [state, setState] = useState<OperationsState>(initialState);

  const { amount, operation, allowance, preview } = state;

  const { data: all } = useContractRead({
    address: assetToken?.address,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [walletAddress, address],
    enabled: isConnected,
    watch: true,
    cacheOnBlock: true,
  });

  useEffect(() => {
    if (all) {
      setState(
        produce((draft) => {
          draft.allowance = all as unknown as BigNumber;
        }),
      );
    }
  }, [all]);

  const { data: pre } = useContractRead({
    address,
    abi: erc4626ABI,
    functionName: 'convertToAssets',
    enabled: !!assetToken?.decimals && !!mvToken?.decimals,
    args: [BigDecimal.ONE.scale(mvToken?.decimals ?? 18).exact],
    watch: true,
    cacheOnBlock: true,
  });

  useEffect(() => {
    if (pre && assetToken?.decimals) {
      setState(
        produce((draft) => {
          draft.assetsPerShare = new BigDecimal(
            pre as unknown as BigNumberish,
            assetToken.decimals,
          );
        }),
      );
    }
  }, [assetToken?.decimals, pre]);

  type PreviewOperation =
    | 'previewDeposit'
    | 'previewMint'
    | 'previewWithdraw'
    | 'previewRedeem';

  const { refetch: fetchPreview } = useContractRead({
    address,
    abi: erc4626ABI,
    functionName: {
      deposit: 'previewDeposit',
      mint: 'previewMint',
      withdraw: 'previewWithdraw',
      redeem: 'previewRedeem',
    }[operation] as PreviewOperation,
    args: [amount?.exact],
    enabled: false,
    onSuccess: (data: BigNumberish) => {
      const dec = ['deposit', 'withdraw'].includes(operation)
        ? mvToken?.decimals
        : assetToken?.decimals;
      setState(
        produce((draft) => {
          draft.preview = data ? new BigDecimal(data, dec) : null;
          draft.isInputLoading = false;
        }),
      );
    },
  });

  useEffect(() => {
    if (!isConnected) {
      setState(initialState);
    }
  }, [isConnected]);

  useEffect(() => {
    const amt = operation === 'deposit' ? amount : preview;

    setState(
      produce((draft) => {
        draft.needsApproval =
          ['deposit', 'mint'].includes(operation) &&
          !!amt &&
          !!allowance &&
          amt.exact.gt(constants.Zero) &&
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
          draft.isError = false;
        }),
      );
    }
  }, [amount, fetchPreview, operation]);

  useEffect(() => {
    setState(
      produce((draft) => {
        draft.isError = state.isInputLoading
          ? false
          : {
              deposit:
                amount &&
                assetBalance &&
                amount.simpleRounded > assetBalance.simpleRounded,
              mint:
                preview &&
                assetBalance &&
                preview.simpleRounded > assetBalance.simpleRounded,
              redeem:
                amount &&
                mvBalance &&
                amount.simpleRounded > mvBalance.simpleRounded,
              withdraw:
                preview &&
                mvBalance &&
                preview.simpleRounded > mvBalance.simpleRounded,
            }[operation];
      }),
    );
  }, [
    amount,
    assetBalance,
    mvBalance,
    operation,
    preview,
    state.isInputLoading,
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

  useEffect(() => {
    setState(initialState);
  }, [walletAddress, chain?.id]);

  return [state, setState];
});
