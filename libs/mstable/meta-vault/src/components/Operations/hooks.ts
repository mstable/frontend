import { useCallback, useMemo } from 'react';

import { erc4626ABI } from '@frontend/shared-constants';
import { usePrices } from '@frontend/shared-prices';
import { BigDecimal } from '@frontend/shared-utils';
import { constants } from 'ethers';
import produce from 'immer';
import { pathOr } from 'ramda';
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

  return (
    ['deposit', 'mint'].includes(operation) &&
    amount &&
    allowance &&
    amount.exact.gt(allowance)
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
