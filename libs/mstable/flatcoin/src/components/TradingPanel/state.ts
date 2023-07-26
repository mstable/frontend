import { useCallback, useEffect, useState } from 'react';

import {
  AddressZero,
  DEFAULT_PRECISION,
  USDC_OPTIMISM,
} from '@dhedge/core-ui-kit/const';
import { useSearch } from '@tanstack/react-location';
import { createContainer } from 'react-tracked';

import type { Dispatch, SetStateAction } from 'react';

import type { FlatcoinRoute, FlatcoinTradingState } from '../../types';

const initialState: FlatcoinTradingState = {
  sendToken: {
    address: AddressZero,
    symbol: '',
    decimals: DEFAULT_PRECISION,
    value: '',
  },
  receiveToken: {
    address: AddressZero,
    symbol: '',
    decimals: DEFAULT_PRECISION,
    value: '',
  },
  leverage: '2',
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

  // TODO: move tokens to constants
  useEffect(() => {
    if (type === 'flatcoin') {
      setState((prevState) => ({
        ...prevState,
        sendToken: USDC_OPTIMISM,
        receiveToken: {
          symbol: 'mStable',
          address: AddressZero,
          decimals: 18,
          value: '',
        },
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        sendToken: {
          symbol: 'ETH',
          address: '0x4200000000000000000000000000000000000006',
          decimals: 18,
          value: '',
        },
        receiveToken: {
          symbol: 'ETH',
          address: '0x4200000000000000000000000000000000000006',
          decimals: 18,
          value: '',
        },
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
    [],
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
    [],
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
    [],
  );
};
