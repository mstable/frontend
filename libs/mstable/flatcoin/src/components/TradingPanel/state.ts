import { useCallback, useEffect, useState } from 'react';

import {
  DEFAULT_MAX_SLIPPAGE,
  SUPPORTED_FLATCOIN_CHAIN_IDS,
  toks,
  ZERO_ADDRESS,
} from '@frontend/shared-constants';
import { isEqualAddresses } from '@frontend/shared-utils';
import { useSearch } from '@tanstack/react-location';
import BigNumber from 'bignumber.js';
import produce from 'immer';
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
  usdc: {
    ...toks[SUPPORTED_FLATCOIN_CHAIN_IDS[0]]['USDC'],
    balance: '',
    price: '',
  },
  flatcoin: {
    ...toks[SUPPORTED_FLATCOIN_CHAIN_IDS[0]]['mStable'],
    balance: '',
    price: '',
  },
  needsApproval: true,
  isInsufficientBalance: false,
  refetch: () => null,
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
      setState(
        produce((draft) => {
          draft.sendToken = {
            symbol: USDC.symbol,
            decimals: USDC.decimals,
            address: USDC.address,
            value: '',
          };
          draft.receiveToken = {
            symbol: FLATCOIN.symbol,
            decimals: FLATCOIN.decimals,
            address: FLATCOIN.address,
            value: '',
          };
          draft.tradingType = 'deposit';
        }),
      );
    } else {
      setState(
        produce((draft) => {
          draft.sendToken = { ...ETH, value: '' };
          draft.receiveToken = { ...ETH, value: '' };
          draft.tradingType = 'deposit';
          draft.needsApproval = false;
        }),
      );
    }
  }, [type, flatcoinChainId]);

  useEffect(() => {
    const { USDC, FLATCOIN } = getFlatcoinTokensByChain(flatcoinChainId);
    setState(
      produce((draft) => {
        draft.usdc = { ...USDC, price: '1', balance: '123' }; // TODO: remove and update
        draft.flatcoin = { ...FLATCOIN, price: '1.2', balance: '321' }; // TODO: remove and update
      }),
    );
  }, [flatcoinChainId]);

  useEffect(() => {
    if (type === 'flatcoin') {
      const sendTokenBalance = isEqualAddresses(
        state.sendToken.address,
        state.usdc.address,
      )
        ? state.usdc.balance
        : state.flatcoin.balance;
      setState(
        produce((draft) => {
          draft.isInsufficientBalance = new BigNumber(
            draft.sendToken.value || '0',
          ).gt(sendTokenBalance || '0');
        }),
      );
    } else {
      setState(
        produce((draft) => {
          draft.isInsufficientBalance = false; // TODO: add logic
        }),
      );
    }
  }, [
    type,
    state.flatcoin.balance,
    state.sendToken.value,
    state.sendToken.address,
    state.usdc.address,
    state.usdc.balance,
  ]);

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

export const useUpdateStableTradingType = (chainId: number) => {
  const { USDC, FLATCOIN } = getFlatcoinTokensByChain(chainId);

  const updateState = useUpdateFlatcoinTradingState();
  return useCallback(
    (tradingType: TradingType) => {
      switch (tradingType) {
        case 'deposit':
          updateState((prevState) => ({
            ...prevState,
            tradingType,
            sendToken: {
              symbol: USDC.symbol,
              address: USDC.address,
              decimals: USDC.decimals,
              value: '',
            },
            receiveToken: {
              symbol: FLATCOIN.symbol,
              address: FLATCOIN.address,
              decimals: FLATCOIN.decimals,
              value: '',
            },
          }));
          return;
        case 'withdraw':
          updateState((prevState) => ({
            ...prevState,
            tradingType,
            sendToken: {
              symbol: FLATCOIN.symbol,
              address: FLATCOIN.address,
              decimals: FLATCOIN.decimals,
              value: '',
            },
            receiveToken: {
              symbol: USDC.symbol,
              address: USDC.address,
              decimals: USDC.decimals,
              value: '',
            },
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
