import { useEffect, useState } from 'react';

import { erc4626ABI } from '@frontend/shared-constants';
import { BigDecimal } from '@frontend/shared-utils';
import { constants } from 'ethers';
import produce from 'immer';
import { createContainer } from 'react-tracked';
import {
  erc20ABI,
  useAccount,
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
  isLoading: boolean;
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
    isLoading: true,
  });

  const { address, mvToken, asset, assetToken } = state;

  const { isLoading: assetLoading, refetch: fetchAsset } = useContractRead({
    addressOrName: address,
    contractInterface: erc4626ABI,
    functionName: 'asset',
    onSuccess: (data) => {
      setState(
        produce((draft) => {
          draft.asset = data as unknown as string;
        }),
      );
    },
  });

  const { isLoading: mvTokenLoading, refetch: fetchMvToken } = useToken({
    address: address,
    onSuccess: (data) => {
      setState(
        produce((draft) => {
          draft.mvToken = data;
        }),
      );
    },
  });

  const { isLoading: tokenLoading, refetch: fetchAssetToken } = useToken({
    address: asset,
    onSuccess: (data) => {
      setState(
        produce((draft) => {
          draft.assetToken = data;
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
      {
        addressOrName: address,
        contractInterface: erc4626ABI,
        functionName: 'balanceOf',
        args: [walletAddress],
      },
      {
        addressOrName: asset,
        contractInterface: erc20ABI,
        functionName: 'balanceOf',
        args: [walletAddress],
      },
    ],
    allowFailure: true,
    cacheOnBlock: true,
    watch: true,
    enabled: !!asset && !!assetToken?.decimals && !!mvToken?.decimals,
    onSettled: (data) => {
      setState(
        produce((draft) => {
          draft.assetsPerShare = data?.[0]
            ? new BigDecimal(data[0], 0)
            : BigDecimal.ONE;
          draft.sharesPerAsset = data?.[1]
            ? new BigDecimal(data[1], 0)
            : BigDecimal.ONE;
          draft.mvBalance = data?.[2]
            ? new BigDecimal(data[2], mvToken.decimals)
            : BigDecimal.ZERO;
          draft.assetBalance = data?.[3]
            ? new BigDecimal(data[3], assetToken.decimals)
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
    if (address) {
      fetchAsset();
    }
  }, [address, fetchAsset]);

  useEffect(() => {
    if (asset) {
      fetchAssetToken();
    }
  }, [asset, fetchAssetToken]);

  useEffect(() => {
    setState(
      produce((draft) => {
        draft.isLoading =
          !asset ||
          !mvToken ||
          !assetToken ||
          assetLoading ||
          tokenLoading ||
          mvTokenLoading;
      }),
    );
  }, [asset, assetLoading, assetToken, mvToken, mvTokenLoading, tokenLoading]);

  return [state, setState];
});
