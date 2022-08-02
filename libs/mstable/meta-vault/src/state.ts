import { useEffect, useState } from 'react';

import { erc4626ABI } from '@frontend/shared-constants';
import produce from 'immer';
import { createContainer } from 'react-tracked';
import { useContractRead, useToken } from 'wagmi';

import type { FetchTokenResult } from '@wagmi/core';
import type { Dispatch, SetStateAction } from 'react';

type MetaVaultState = {
  address: string | null;
  mvToken: FetchTokenResult | null;
  asset: string | null;
  assetToken: FetchTokenResult | null;
  isLoading: boolean;
};

export const { Provider, useUpdate, useTrackedState } = createContainer<
  MetaVaultState,
  Dispatch<SetStateAction<MetaVaultState>>,
  { initialState: { address: string } }
>(({ initialState }) => {
  const [state, setState] = useState<MetaVaultState>({
    ...initialState,
    mvToken: null,
    asset: null,
    assetToken: null,
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

  const { isLoading: tokenLoading, refetch: fetchToken } = useToken({
    address: asset,
    onSuccess: (data) => {
      setState(
        produce((draft) => {
          draft.assetToken = data;
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
      fetchToken();
    }
  }, [asset, fetchToken]);

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
