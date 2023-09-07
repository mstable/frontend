import { useCallback, useEffect, useState } from 'react';

import {
  DEFAULT_LEVERAGE_COEFF,
  DEFAULT_MAX_SLIPPAGE,
} from '@frontend/flatcoin-constants';
import { ZERO_ADDRESS } from '@frontend/shared-constants';
import { BigDecimal, isEqualAddresses } from '@frontend/shared-utils';
import BigNumber from 'bignumber.js';
import produce from 'immer';
import { createContainer } from 'react-tracked';
import { erc20ABI, useAccount, useContractReads } from 'wagmi';

import { useFlatcoinType } from '../../hooks';
import { useFlatcoin } from '../../state';
import {
  getFlatcoinDelayedOrderContract,
  getFlatcoinTokensByChain,
} from '../../utils';
import { useTradingType } from './hooks/useTradingType';

import type { Dispatch, SetStateAction } from 'react';

import type { FlatcoinTradingState } from '../../types';

const TOKEN_STUB = {
  address: ZERO_ADDRESS,
  symbol: '',
  decimals: 18,
  value: '',
};

const initialState: FlatcoinTradingState = {
  sendToken: TOKEN_STUB,
  receiveToken: TOKEN_STUB,
  leverage: DEFAULT_LEVERAGE_COEFF,
  rawMaxFillPrice: BigDecimal.ZERO,
  slippage: DEFAULT_MAX_SLIPPAGE,
  isInfiniteAllowance: false,
  needsApproval: true,
  isInsufficientBalance: false,
  refetchAllowance: () => null,
  reset: () => null,
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
  const [type] = useFlatcoinType();
  const [tradingType] = useTradingType();
  const { address: walletAddress } = useAccount();
  const {
    flatcoinChainId,
    tokens: { collateral, flatcoin },
  } = useFlatcoin();
  const [state, setState] = useState<FlatcoinTradingState>(initialState);

  const { data: contractData, refetch } = useContractReads({
    contracts: [
      {
        address: state.sendToken.address,
        chainId: flatcoinChainId,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [
          walletAddress,
          getFlatcoinDelayedOrderContract(flatcoinChainId).address,
        ],
      },
    ],
  });

  // handle needsApproval
  useEffect(() => {
    if (!contractData) return;
    setState(
      produce((draft) => {
        draft.needsApproval = new BigNumber(state.sendToken.value || '0').gt(
          new BigNumber(contractData[0]?.toString() ?? '0').shiftedBy(
            -state.sendToken.decimals,
          ),
        );
      }),
    );
  }, [contractData, state.sendToken.decimals, state.sendToken.value]);

  const reset = useCallback(() => {
    setState(
      produce((draft) => {
        draft.sendToken.value = '';
        draft.receiveToken.value = '';
        draft.leverage = DEFAULT_LEVERAGE_COEFF;
      }),
    );
    refetch();
  }, [refetch]);

  useEffect(() => {
    setState(
      produce((draft) => {
        draft.refetchAllowance = refetch;
        draft.reset = reset;
      }),
    );
  }, [refetch, reset]);

  // Set correct tokens on page type switch
  useEffect(() => {
    const isLeveraged = type === 'leveraged';
    const { COLLATERAL, FLATCOIN } = getFlatcoinTokensByChain(flatcoinChainId);
    const collateral = {
      symbol: COLLATERAL.symbol,
      decimals: COLLATERAL.decimals,
      address: COLLATERAL.address,
      value: '',
    };
    const flatcoin = {
      symbol: FLATCOIN.symbol,
      decimals: FLATCOIN.decimals,
      address: FLATCOIN.address,
      value: '',
    };
    if (isLeveraged) {
      setState(
        produce((draft) => {
          draft.sendToken = collateral;
          draft.receiveToken = collateral;
          draft.needsApproval = false;
        }),
      );
      return;
    }
    const isDeposit = tradingType === 'deposit';
    setState(
      produce((draft) => {
        draft.sendToken = isDeposit ? collateral : flatcoin;
        draft.receiveToken = isDeposit ? flatcoin : collateral;
      }),
    );
  }, [type, flatcoinChainId, tradingType]);

  // handle isInsufficientBalance check
  useEffect(() => {
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
        ).gt(sendTokenBalance.string);
      }),
    );
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

export const useUpdateMaxFillPrice = () => {
  const updateState = useUpdateFlatcoinTradingState();
  return useCallback(
    (rawMaxFillPrice: BigDecimal) =>
      updateState((prevState) => ({
        ...prevState,
        rawMaxFillPrice,
      })),
    [updateState],
  );
};
