import { useState } from 'react';

import { erc4626ABI } from '@frontend/shared-constants';
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

import type { FetchTokenResult } from '@wagmi/core';
import type { Dispatch, SetStateAction } from 'react';

type MetaVaultState = {
  address: string | null;
  mvToken: FetchTokenResult | null;
  asset: string | null;
  assetToken: FetchTokenResult | null;
  mvBalance: BigDecimal | null;
  assetBalance: BigDecimal | null;
  assetsPerShare: BigDecimal | null;
  sharesPerAsset: BigDecimal | null;
};

export const { Provider, useUpdate, useTrackedState } = createContainer<
  MetaVaultState,
  Dispatch<SetStateAction<MetaVaultState>>,
  { initialState: { address: string } }
>(({ initialState }) => {
  const { address: walletAddress } = useAccount();
  const [state, setState] = useState<MetaVaultState>({
    ...initialState,
    mvToken: null,
    asset: null,
    assetToken: null,
    mvBalance: null,
    assetBalance: null,
    assetsPerShare: null,
    sharesPerAsset: null,
  });

  const { address, asset } = state;

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

  useToken({
    address: address,
    enabled: !!address,
    onSuccess: (data) => {
      setState(
        produce((draft) => {
          draft.mvToken = data;
        }),
      );
    },
  });

  useToken({
    address: asset,
    enabled: !!asset,
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
    enabled: !!address,
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

  return [state, setState];
});
