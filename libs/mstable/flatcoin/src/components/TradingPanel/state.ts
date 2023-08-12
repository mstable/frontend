import { useCallback, useEffect, useState } from 'react';

import { DEFAULT_PRECISION } from '@dhedge/core-ui-kit/const';
import { DEFAULT_MAX_SLIPPAGE, ZERO_ADDRESS } from '@frontend/shared-constants';
import { isEqualAddresses } from '@frontend/shared-utils';
import { useSearch } from '@tanstack/react-location';
import BigNumber from 'bignumber.js';
import produce from 'immer';
import { createContainer } from 'react-tracked';
import { useContractReads } from 'wagmi';

import { useFlatcoin } from '../../state';
import {
  getFlatcoinKeeperFeeContract,
  getFlatcoinTokensByChain,
} from '../../utils';

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
  needsApproval: true,
  isInsufficientBalance: false,
  keeperFee: {
    rawFee: '',
    formattedFee: '',
  },
  refetch: () => null, // TODO: implement refetch logic after adding contract calls
  reset: () => null, // TODO: implement refetch logic after adding contract calls
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
  const {
    flatcoinChainId,
    tokens: { collateral, flatcoin },
  } = useFlatcoin();
  const [state, setState] = useState<FlatcoinTradingState>(initialState);
  const { type } = useSearch<FlatcoinRoute>();

  const { refetch } = useContractReads({
    contracts: [
      {
        address: getFlatcoinKeeperFeeContract(flatcoinChainId).address,
        chainId: flatcoinChainId,
        abi: getFlatcoinKeeperFeeContract(flatcoinChainId).abi,
        functionName: 'getKeeperFee',
        args: [],
      },
    ],
    onSuccess(data) {
      if (!data) return;
      setState(
        produce((draft) => {
          draft.keeperFee.rawFee = data[0].toString();
          draft.keeperFee.formattedFee = new BigNumber(data[0].toString())
            .shiftedBy(-DEFAULT_PRECISION)
            .toFixed();
        }),
      );
    },
    // watch: true,
  });

  useEffect(() => {
    setState(
      produce((draft) => {
        draft.refetch = refetch;
      }),
    );
  }, [refetch]);

  // Set correct tokens on page type switch
  useEffect(() => {
    const { COLLATERAL, FLATCOIN, ETH } =
      getFlatcoinTokensByChain(flatcoinChainId);
    if (type === 'flatcoin') {
      setState(
        produce((draft) => {
          draft.sendToken = {
            symbol: COLLATERAL.symbol,
            decimals: COLLATERAL.decimals,
            address: COLLATERAL.address,
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

  // handle isInsufficientBalance check
  useEffect(() => {
    if (type === 'flatcoin') {
      const sendTokenBalance = isEqualAddresses(
        state.sendToken.address,
        collateral.address,
      )
        ? collateral.balance
        : flatcoin.balance;
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
    flatcoin.balance,
    state.sendToken.value,
    state.sendToken.address,
    collateral.address,
    collateral.balance,
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
  const updateState = useUpdateFlatcoinTradingState();
  return useCallback(
    (tradingType: TradingType) => {
      const { COLLATERAL, FLATCOIN } = getFlatcoinTokensByChain(chainId);
      switch (tradingType) {
        case 'deposit':
          updateState((prevState) => ({
            ...prevState,
            tradingType,
            sendToken: {
              symbol: COLLATERAL.symbol,
              address: COLLATERAL.address,
              decimals: COLLATERAL.decimals,
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
              symbol: COLLATERAL.symbol,
              address: COLLATERAL.address,
              decimals: COLLATERAL.decimals,
              value: '',
            },
          }));
          return;
      }
    },
    [updateState, chainId],
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
