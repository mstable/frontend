import { useCallback, useEffect, useState } from 'react';

import { DEFAULT_MAX_SLIPPAGE, ZERO_ADDRESS } from '@frontend/shared-constants';
import { useSearch } from '@tanstack/react-location';
import { createContainer } from 'react-tracked';

import { useFlatcoin } from '../../state';
import { getFlatcoinTokensByChain } from '../../utils';

import type { Dispatch, SetStateAction } from 'react';

import type {
  FlatcoinRoute,
  FlatcoinTradingState,
  TradingType,
} from '../../types';

const TOKEN_STUB = {
  address: ZERO_ADDRESS,
  symbol: '',
  decimals: 18,
  value: '',
};

const initialState: FlatcoinTradingState = {
  sendToken: TOKEN_STUB,
  receiveToken: TOKEN_STUB,
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
  const { flatcoinChainId } = useFlatcoin();
  const [state, setState] = useState<FlatcoinTradingState>(initialState);
  const { type } = useSearch<FlatcoinRoute>();

  // Set correct tokens on page type switch
  useEffect(() => {
    const { USDC, FLATCOIN, ETH } = getFlatcoinTokensByChain(flatcoinChainId);
    if (type === 'flatcoin') {
      setState((prevState) => ({
        ...prevState,
        sendToken: USDC,
        receiveToken: FLATCOIN,
        tradingType: 'deposit',
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        sendToken: ETH,
        receiveToken: ETH,
        tradingType: 'deposit',
      }));
    }
  }, [type, flatcoinChainId]);

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
  const { flatcoinChainId } = useFlatcoin();
  const { USDC, FLATCOIN } = getFlatcoinTokensByChain(flatcoinChainId);
  const updateState = useUpdateFlatcoinTradingState();
  return useCallback(
    (tradingType: TradingType) => {
      switch (tradingType) {
        case 'deposit':
          updateState((prevState) => ({
            ...prevState,
            tradingType,
            sendToken: USDC,
            receiveToken: FLATCOIN,
          }));
          return;
        case 'withdraw':
          updateState((prevState) => ({
            ...prevState,
            tradingType,
            sendToken: FLATCOIN,
            receiveToken: USDC,
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
