/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  cons,
  tokens,
  VELODROME_PAIRS_API_ENDPOINT,
} from '@frontend/shared-constants';
import { BigDecimal } from '@frontend/shared-utils';
import { useQuery } from '@tanstack/react-query';
import produce from 'immer';
import { createContainer } from 'react-tracked';
import { useAccount, useContractReads, useNetwork } from 'wagmi';
import { mainnet, optimism } from 'wagmi/chains';

import type { Contract, Token } from '@frontend/shared-constants';
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
  needsApproval: boolean;
  mtaBuybackPrice: number;
  mta: InputProps;
  mty: InputProps;
  l1Comptroller: Contract;
  l2Comptroller: Contract;
  mtyPool: Contract;
  reset: () => void;
};

export const { Provider, useTrackedState, useUpdate } = createContainer(() => {
  const { chain } = useNetwork();
  const { address: walletAddress, isConnected } = useAccount();

  const [state, setState] = useState<StateProps>({
    step: 0,
    isLoading: true,
    isError: false,
    needsApproval: true,
    mtaBuybackPrice: 0.0318,
    mta: {
      amount: BigDecimal.ZERO,
      balance: BigDecimal.ZERO,
      price: 0,
      contract: tokens[chain?.id ?? mainnet.id].find(
        (token) => token.symbol === 'MTA',
      ),
    },
    mty: {
      amount: BigDecimal.ZERO,
      balance: BigDecimal.ZERO,
      price: 0,
      contract: tokens[optimism.id].find((token) => token.symbol === 'MTy'),
    },
    mtyPool: cons[optimism.id]['0x0F6eAe52ae1f94Bc759ed72B201A2fDb14891485'],
    l1Comptroller:
      cons[mainnet.id]['0x3509816328cf50Fed7631c2F5C9a18c75cd601F0'],
    l2Comptroller:
      cons[optimism.id]['0x3509816328cf50Fed7631c2F5C9a18c75cd601F0'],
    reset: () => null,
  });

  const allArgs = useMemo(
    () => [
      walletAddress,
      chain?.id === mainnet.id
        ? state.l1Comptroller.address
        : state.l2Comptroller.address,
    ],
    [
      chain?.id,
      state.l1Comptroller.address,
      state.l2Comptroller.address,
      walletAddress,
    ],
  );

  const { data: velo, isLoading: veloLoading } = useQuery(
    ['vAMM-USDC/MTA'],
    async ({ queryKey }) => {
      const { data } = await (await fetch(VELODROME_PAIRS_API_ENDPOINT)).json();

      return data.find((d: { symbol: string }) => d.symbol === queryKey[0]);
    },
  );

  useEffect(() => {
    if (velo?.token1?.price) {
      setState(
        produce((draft) => {
          draft.mta.price = velo.token1.price;
        }),
      );
    }
  }, [velo?.token1?.price]);

  const { data, isLoading, refetch } = useContractReads({
    contracts: [
      {
        address: state.mta.contract.address,
        abi: state.mta.contract.abi,
        functionName: 'allowance',
        args: allArgs,
      },
      {
        address: state.mta.contract.address,
        abi: state.mta.contract.abi,
        chainId: state.mta.contract.chainId,
        functionName: 'balanceOf',
        args: [walletAddress],
      },
      {
        address: state.mty.contract.address,
        abi: state.mty.contract.abi,
        chainId: state.mty.contract.chainId,
        functionName: 'balanceOf',
        args: [walletAddress],
      },
      {
        address: state.mtyPool.address,
        abi: state.mtyPool.abi,
        chainId: state.mtyPool.chainId,
        functionName: 'tokenPrice',
      },
    ],
    watch: true,
  });

  useEffect(() => {
    if (data) {
      setState(
        produce((draft) => {
          draft.needsApproval = state.mta.amount.exact.gt(
            new BigDecimal(
              data[0] as unknown as BigNumberish,
              state.mta.contract.decimals,
            ).exact,
          );
          draft.mta.balance = new BigDecimal(
            data[1] as unknown as BigNumberish,
            state.mta.contract.decimals,
          );
          draft.mty.balance = new BigDecimal(
            data[2] as unknown as BigNumberish,
            state.mty.contract.decimals,
          );
          draft.mty.price = new BigDecimal(
            data[3] as unknown as BigNumberish,
            draft.mty.contract.decimals,
          ).simple;
        }),
      );
    }
  }, [
    data,
    refetch,
    state.mta.amount.exact,
    state.mta.contract.decimals,
    state.mty.contract.decimals,
  ]);

  useEffect(() => {
    setState(
      produce((draft) => {
        draft.isLoading = isLoading || veloLoading;
      }),
    );
  }, [isLoading, veloLoading]);

  useEffect(() => {
    setState(
      produce((draft) => {
        draft.isError = state.mta.amount.exact.gt(state.mta.balance.exact);
      }),
    );
  }, [state.mta.amount.exact, state.mta.balance.exact]);

  const reset = useCallback(() => {
    setState(
      produce((draft) => {
        draft.mta.amount = BigDecimal.ZERO;
        draft.mta.balance = BigDecimal.ZERO;
        draft.mty.balance = BigDecimal.ZERO;
        draft.mty.balance = BigDecimal.ZERO;
        draft.needsApproval = true;
        draft.isError = false;
      }),
    );
    refetch();
  }, [refetch]);

  useEffect(() => {
    setState(
      produce((draft) => {
        draft.reset = reset;
      }),
    );
    if (!isConnected) {
      reset();
    }
  }, [isConnected, reset]);

  return [state, setState];
});
