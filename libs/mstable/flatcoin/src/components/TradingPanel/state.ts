import { useCallback, useEffect, useState } from 'react';

import { USDC_OPTIMISM } from '@dhedge/core-ui-kit/const';
import {
  DEFAULT_MAX_SLIPPAGE,
  ETH_OPTIMISM,
  FLATCOIN_OPTIMISM,
} from '@frontend/shared-constants';
import { useSearch } from '@tanstack/react-location';
import { createContainer } from 'react-tracked';

import type { Dispatch, SetStateAction } from 'react';

import type {
  FlatcoinRoute,
  FlatcoinTradingState,
  TradingType,
} from '../../types';

const initialState: FlatcoinTradingState = {
  sendToken: USDC_OPTIMISM,
  receiveToken: FLATCOIN_OPTIMISM,
  leverage: '2',
  tradingType: 'deposit',
  slippage: DEFAULT_MAX_SLIPPAGE,
  isInfiniteAllowance: false,
};

export const {
  Provider: FlatcoinTradingStateProvider,
  useUpdate: useUpdateFlatcoinTradingState,
  useTrackedState: useFlatcoinTradingState,
} = createContainer<
  FlatcoinTradingState,
  Dispatch<SetStateAction<FlatcoinTradingState>>,
  unknown
>(() => {
  const [state, setState] = useState<FlatcoinTradingState>(initialState);
  const { type } = useSearch<FlatcoinRoute>();

  // Set correct tokens on page type switch
  useEffect(() => {
    if (type === 'flatcoin') {
      setState((prevState) => ({
        ...prevState,
        sendToken: USDC_OPTIMISM,
        receiveToken: FLATCOIN_OPTIMISM,
        tradingType: 'deposit',
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        sendToken: ETH_OPTIMISM,
        receiveToken: ETH_OPTIMISM,
        tradingType: 'deposit',
      }));
    }
  }, [type]);

  return [state, setState];
});

export const useUpdateSendToken = () => {
  const updateState = useUpdateFlatcoinTradingState();
  return useCallback(
    (token: Partial<FlatcoinTradingState['sendToken']>) =>
      updateState((prevState) => ({
        ...prevState,
        sendToken: { ...prevState.sendToken, ...token },
      })),
    [updateState],
  );
};

export const useUpdateReceiveToken = () => {
  const updateState = useUpdateFlatcoinTradingState();
  return useCallback(
    (token: Partial<FlatcoinTradingState['receiveToken']>) =>
      updateState((prevState) => ({
        ...prevState,
        receiveToken: { ...prevState.receiveToken, ...token },
      })),
    [updateState],
  );
};

export const useUpdateLeverage = () => {
  const updateState = useUpdateFlatcoinTradingState();
  return useCallback(
    (leverage: Partial<FlatcoinTradingState['leverage']>) =>
      updateState((prevState) => ({
        ...prevState,
        leverage,
      })),
    [updateState],
  );
};

export const useUpdateStableTradingType = () => {
  const updateState = useUpdateFlatcoinTradingState();
  return useCallback(
    (tradingType: TradingType) => {
      switch (tradingType) {
        case 'deposit':
          updateState((prevState) => ({
            ...prevState,
            tradingType,
            sendToken: USDC_OPTIMISM,
            receiveToken: FLATCOIN_OPTIMISM,
          }));
          return;
        case 'withdraw':
          updateState((prevState) => ({
            ...prevState,
            tradingType,
            sendToken: FLATCOIN_OPTIMISM,
            receiveToken: USDC_OPTIMISM,
          }));
          return;
      }
    },
    [updateState],
  );
};

export const useUpdateTradingSlippage = () => {
  const updateState = useUpdateFlatcoinTradingState();
  return useCallback(
    (slippage: string) =>
      updateState((prevState) => ({
        ...prevState,
        slippage,
      })),
    [updateState],
  );
};

export const useUpdateTradingAllowance = () => {
  const updateState = useUpdateFlatcoinTradingState();
  return useCallback(
    (isInfiniteAllowance: boolean) =>
      updateState((prevState) => ({
        ...prevState,
        isInfiniteAllowance,
      })),
    [updateState],
  );
};
