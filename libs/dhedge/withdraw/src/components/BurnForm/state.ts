import { useCallback, useEffect, useState } from 'react';

import { useDebounce } from '@frontend/shared-hooks';
import { BigDecimal } from '@frontend/shared-utils';
import produce from 'immer';
import { createContainer } from 'react-tracked';
import { useAccount, useContractRead, useContractReads } from 'wagmi';

import {
  l1ComptrollerContract,
  l2ComptrollerContract,
  l2Token,
  zeroL1Token,
} from '../../constants';
import { useL1VaultAddressWithBalance } from '../../hooks/useL1VaultAddressWithBalance';

import type { Token } from '@frontend/shared-constants';
import type { BigNumberish } from 'ethers';

type InputProps = {
  contract: Token;
  amount: BigDecimal;
  balance: BigDecimal;
  price: number;
};

type StateProps = {
  step: number;
  isLoading: boolean;
  isError: boolean;
  allowance: BigDecimal;
  l1token: InputProps;
  l2token: InputProps;
  refetch: () => void;
  reset: () => void;
};

export const { Provider, useTrackedState, useUpdate } = createContainer(() => {
  const { address: walletAddress, isConnected } = useAccount();

  const [state, setState] = useState<StateProps>({
    step: 0,
    isLoading: true,
    isError: false,
    allowance: BigDecimal.ZERO,
    l1token: {
      amount: BigDecimal.ZERO,
      balance: BigDecimal.ZERO,
      price: 0,
      contract: zeroL1Token,
    },
    l2token: {
      amount: BigDecimal.ZERO,
      balance: BigDecimal.ZERO,
      price: 0,
      contract: l2Token,
    },
    refetch: () => null,
    reset: () => null,
  });

  const v1VaultAddress = useL1VaultAddressWithBalance();
  useEffect(() => {
    setState(
      produce((draft) => {
        draft.l1token.contract.address = v1VaultAddress;
        draft.l1token.contract.name = undefined;
      }),
    );
  }, [v1VaultAddress]);

  console.log(state);

  const { data, isLoading, refetch } = useContractReads({
    contracts: [
      {
        address: state.l1token.contract.address,
        abi: state.l1token.contract.abi,
        functionName: 'name',
        chainId: state.l1token.contract.chainId,
        args: [],
      },
      {
        address: state.l1token.contract.address,
        abi: state.l1token.contract.abi,
        functionName: 'allowance',
        chainId: state.l1token.contract.chainId,
        args: [walletAddress, l1ComptrollerContract.address],
      },
      {
        address: state.l1token.contract.address,
        abi: state.l1token.contract.abi,
        chainId: state.l1token.contract.chainId,
        functionName: 'balanceOf',
        args: [walletAddress],
      },
      {
        address: state.l2token.contract.address,
        abi: state.l2token.contract.abi,
        chainId: state.l2token.contract.chainId,
        functionName: 'balanceOf',
        args: [walletAddress],
      },
      {
        address: state.l2token.contract.address,
        abi: state.l2token.contract.abi,
        chainId: state.l2token.contract.chainId,
        functionName: 'tokenPrice',
      },
      {
        address: l2ComptrollerContract.address,
        abi: l2ComptrollerContract.abi,
        chainId: l2ComptrollerContract.chainId,
        functionName: 'exchangePrices',
        args: [state.l1token.contract.address],
      },
    ],
    watch: true,
    enabled: isConnected,
  });

  useEffect(() => {
    if (data) {
      setState(
        produce((draft) => {
          draft.l1token.contract.name = data[0] as unknown as string;
          draft.allowance = new BigDecimal(
            data[1] as unknown as BigNumberish,
            state.l1token.contract.decimals,
          );
          draft.l1token.balance = new BigDecimal(
            data[2] as unknown as BigNumberish,
            state.l1token.contract.decimals,
          );
          draft.l2token.balance = new BigDecimal(
            data[3] as unknown as BigNumberish,
            state.l1token.contract.decimals,
          );
          draft.l2token.price = new BigDecimal(
            data[4] as unknown as BigNumberish,
            draft.l2token.contract.decimals,
          ).simple;
          draft.l1token.price = new BigDecimal(
            data[5] as unknown as BigNumberish,
            draft.l1token.contract.decimals,
          ).simple;
        }),
      );
    }
  }, [data, refetch, state.l1token.contract.decimals]);

  const debouncedL1TokenAmount = useDebounce(
    state.l1token.amount.exact.toString(),
    500,
  );
  useContractRead({
    address: l2ComptrollerContract.address,
    abi: l2ComptrollerContract.abi,
    chainId: l2ComptrollerContract.chainId,
    functionName: 'convertToTokenToBuy',
    args: [
      state.l1token.contract.address,
      state.l2token.contract.address,
      debouncedL1TokenAmount,
    ],
    enabled: debouncedL1TokenAmount !== '0',
    onSuccess: (data) => {
      setState(
        produce((draft) => {
          draft.l2token.amount = new BigDecimal(data.toString());
        }),
      );
    },
  });

  const reset = useCallback(() => {
    setState(
      produce((draft) => {
        draft.l1token.amount = BigDecimal.ZERO;
        draft.l2token.amount = BigDecimal.ZERO;
        draft.l1token.balance = BigDecimal.ZERO;
        draft.l2token.balance = BigDecimal.ZERO;
        draft.allowance = BigDecimal.ZERO;
        draft.isError = false;
      }),
    );
    refetch();
  }, [refetch]);

  useEffect(() => {
    setState(
      produce((draft) => {
        draft.isLoading = isLoading;
        draft.refetch = refetch;
        draft.reset = reset;
      }),
    );
  }, [isLoading, refetch, reset]);

  useEffect(() => {
    setState(
      produce((draft) => {
        draft.isError = state.l1token.amount.exact.gt(
          state.l1token.balance.exact,
        );
      }),
    );
  }, [state.l1token.amount.exact, state.l1token.balance.exact]);

  useEffect(() => {
    if (!isConnected) {
      reset();
    }
  }, [isConnected, reset]);

  return [state, setState];
});
