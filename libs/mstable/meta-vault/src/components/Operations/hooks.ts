import { useCallback, useMemo } from 'react';

import { erc4626ABI } from '@frontend/shared-constants';
import { usePrices } from '@frontend/shared-prices';
import { BigDecimal } from '@frontend/shared-utils';
import { constants } from 'ethers';
import produce from 'immer';
import { pathOr } from 'ramda';
import { useIntl } from 'react-intl';
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useFeeData,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi';

import { useMetaVault } from '../../hooks';
import { useTrackedState, useUpdate } from './state';

import type { SupportedOperation } from './state';

export const useOperations = () => useTrackedState();

export const useSetAmount = () => {
  const update = useUpdate();

  return useCallback(
    (amount: BigDecimal) => {
      update(
        produce((state) => {
          state.amount = amount;
        }),
      );
    },
    [update],
  );
};

export const useChangeOperation = () => {
  const update = useUpdate();
  const { assetToken, mvToken, assetBalance, mvBalance } = useMetaVault();

  return useCallback(
    (operation: SupportedOperation) => {
      update(
        produce((state) => {
          state.operation = operation;
          state.amount = null;
          state.token = {
            deposit: assetToken,
            mint: mvToken,
            redeem: mvToken,
            withdraw: assetToken,
          }[operation];
          state.balance = {
            deposit: assetBalance,
            mint: mvBalance,
            redeem: mvBalance,
            withdraw: assetBalance,
          }[operation];
        }),
      );
    },
    [assetBalance, assetToken, mvBalance, mvToken, update],
  );
};

export const useChangeTab = () => {
  const update = useUpdate();
  const { assetToken, mvToken, assetBalance, mvBalance } = useMetaVault();

  return useCallback(
    (tab: 0 | 1) => {
      update(
        produce((state) => {
          state.tab = tab;
          state.operation = tab === 0 ? 'deposit' : 'redeem';
          state.amount = null;
          state.token = tab === 0 ? assetToken : mvToken;
          state.balance = tab === 0 ? assetBalance : mvBalance;
        }),
      );
    },
    [assetBalance, assetToken, mvBalance, mvToken, update],
  );
};

export const useReset = () => {
  const update = useUpdate();

  return useCallback(() => {
    update(
      produce((state) => {
        state.amount = null;
      }),
    );
  }, [update]);
};

export const usePreview = () => {
  const { address } = useMetaVault();
  const { amount, operation } = useTrackedState();

  const functionName = {
    deposit: 'previewDeposit',
    mint: 'previewMint',
    withdraw: 'previewWithdraw',
    redeem: 'previewRedeem',
  }[operation];

  const { data, refetch: refetchPreview } = useContractRead({
    addressOrName: address,
    contractInterface: erc4626ABI,
    functionName,
    args: [amount?.exact],
    enabled: !!amount?.exact && !!operation,
  });

  const preview = data ? new BigDecimal(data) : null;

  return { preview, refetchPreview };
};

export const useNeedApproval = () => {
  const { amount, operation, allowance } = useTrackedState();
  const { preview } = usePreview();

  const amt = operation === 'deposit' ? amount : preview;

  return (
    ['deposit', 'mint'].includes(operation) &&
    amt &&
    allowance &&
    amt.exact.gt(allowance)
  );
};

export const useApprovalConfig = () => {
  const { address, asset } = useMetaVault();
  const needApproval = useNeedApproval();

  return usePrepareContractWrite({
    addressOrName: asset,
    contractInterface: erc20ABI,
    functionName: 'approve',
    args: [address, constants.MaxUint256],
    enabled: !!asset && needApproval,
  });
};

export const useOperationConfig = () => {
  const { address } = useMetaVault();
  const { address: walletAddress } = useAccount();
  const { amount, operation } = useTrackedState();
  const needApproval = useNeedApproval();

  const args = useMemo(
    () =>
      ({
        deposit: [amount?.exact, walletAddress],
        mint: [amount?.exact, walletAddress],
        withdraw: [amount?.exact, walletAddress, walletAddress],
        redeem: [amount?.exact, walletAddress, walletAddress],
      }[operation] || []),
    [amount?.exact, operation, walletAddress],
  );

  return usePrepareContractWrite({
    addressOrName: address,
    contractInterface: erc4626ABI,
    functionName: operation,
    args,
    enabled: !!amount?.exact && !!walletAddress && !needApproval,
  });
};

export const useOperationLabel = () => {
  const intl = useIntl();
  const { operation } = useTrackedState();

  return useMemo(
    () =>
      ({
        deposit: intl.formatMessage({ defaultMessage: 'Deposit' }),
        mint: intl.formatMessage({ defaultMessage: 'Mint' }),
        withdraw: intl.formatMessage({ defaultMessage: 'Withdraw' }),
        redeem: intl.formatMessage({ defaultMessage: 'Redeem' }),
      }[operation]),
    [intl, operation],
  );
};

export const useOperationResultLabel = () => {
  const intl = useIntl();
  const { operation, amount } = useTrackedState();
  const { preview } = usePreview();

  return useMemo(
    () =>
      ({
        deposit: intl.formatMessage(
          {
            defaultMessage:
              'You deposit {amount} tokens and receive {preview} shares',
          },
          { amount: amount?.format(), preview: preview?.format() },
        ),
        mint: intl.formatMessage(
          { defaultMessage: 'You mint {amount} shares for {preview} tokens' },
          { amount: amount?.format(), preview: preview?.format() },
        ),
        withdraw: intl.formatMessage(
          {
            defaultMessage:
              'You withdraw {amount} tokens by burning {preview} shares',
          },
          { amount: amount?.format(), preview: preview?.format() },
        ),
        redeem: intl.formatMessage(
          { defaultMessage: 'You redeem {amount} shares for {preview} tokens' },
          { amount: amount?.format(), preview: preview?.format() },
        ),
      }[operation]),
    [amount, intl, operation, preview],
  );
};

export const useEstimateGas = () => {
  const { config: approvalConfig } = useApprovalConfig();
  const { config: operationConfig } = useOperationConfig();
  const { data: feeData } = useFeeData({ formatUnits: 'gwei' });
  const { price } = usePrices();
  const { chain } = useNetwork();
  const needApproval = useNeedApproval();

  const gasPrice = feeData?.gasPrice ?? constants.Zero;
  const estimatedGasAmount = pathOr(
    constants.Zero,
    ['request', 'gasLimit'],
    needApproval ? approvalConfig : operationConfig,
  ).mul(gasPrice);
  const nativeTokenGasPrice = new BigDecimal(
    estimatedGasAmount,
    chain?.nativeCurrency?.decimals,
  );
  const fiatGasPrice = price * nativeTokenGasPrice?.simple;

  return {
    estimatedGasAmount,
    nativeTokenGasPrice,
    fiatGasPrice,
  };
};
