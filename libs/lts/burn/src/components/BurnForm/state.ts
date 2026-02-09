import { useCallback, useEffect, useMemo, useState } from 'react';

import { toks } from '@frontend/shared-constants';
import { BigDecimal } from '@frontend/shared-utils';
import produce from 'immer';
import { createContainer } from 'react-tracked';
import { useAccount, useContractReads, useNetwork } from 'wagmi';
import { mainnet, optimism } from 'wagmi/chains';

import {
  l1Comptroller,
  l2Comptroller,
  mtaBuybackPrice,
  mtaTokenMainnet,
  mtaTotalSupply,
  mtyPool,
  velodromeMtaUsdcLP,
} from '../../constants';

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
  needsApproval: boolean;
  mta: InputProps;
  mty: InputProps;
  refetch: () => void;
  reset: () => void;
  totalBurned: number;
};

export const { Provider, useTrackedState, useUpdate } = createContainer(() => {
  const { chain } = useNetwork();
  const { address: walletAddress, isConnected } = useAccount();

  const [state, setState] = useState<StateProps>({
    step: 0,
    isLoading: true,
    isError: false,
    needsApproval: true,
    mta: {
      amount: BigDecimal.ZERO,
      balance: BigDecimal.ZERO,
      price: 0,
      contract: toks[mainnet.id]['MTA'],
    },
    mty: {
      amount: BigDecimal.ZERO,
      balance: BigDecimal.ZERO,
      price: 0,
      contract: toks[optimism.id]['MTy'],
    },
    totalBurned: 0,
    refetch: () => null,
    reset: () => null,
  });

  useEffect(() => {
    const chainId = !chain || chain.unsupported ? mainnet.id : chain.id;
    const mtaToken = toks[chainId]?.['MTA'] ?? toks[mainnet.id]['MTA'];
    setState(
      produce((draft) => {
        draft.mta.contract = mtaToken;
      }),
    );
  }, [chain?.id]);

  const allArgs = useMemo(
    () => [
      walletAddress,
      chain?.id === mainnet.id ? l1Comptroller.address : l2Comptroller.address,
    ],
    [chain?.id, walletAddress],
  );

  const { data, isLoading, refetch } = useContractReads({
    contracts: [
      {
        address: state.mta.contract.address,
        abi: state.mta.contract.abi,
        functionName: 'allowance',
        chainId: state.mta.contract.chainId,
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
        address: mtyPool.address,
        abi: mtyPool.abi,
        chainId: mtyPool.chainId,
        functionName: 'tokenPrice',
      },
      {
        address: velodromeMtaUsdcLP.address,
        abi: velodromeMtaUsdcLP.abi,
        chainId: velodromeMtaUsdcLP.chainId,
        functionName: 'getAmountOut',
        args: [
          BigDecimal.ONE.scale(toks[optimism.id]['USDC'].decimals).exact,
          toks[optimism.id]['USDC'].address,
        ],
      },
      {
        address: mtaTokenMainnet.address,
        abi: mtaTokenMainnet.abi,
        chainId: mtaTokenMainnet.chainId,
        functionName: 'totalSupply',
        args: [],
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
          const price = new BigDecimal(
            data[4] as unknown as BigNumberish,
            draft.mta.contract.decimals,
          ).simple;
          draft.mta.price = price === 0 ? 0 : 1 / price;
          draft.totalBurned = data[5]
            ? mtaTotalSupply -
              new BigDecimal(data[5] as unknown as BigNumberish).simpleRounded
            : 0;
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

  const reset = useCallback(() => {
    setState(
      produce((draft) => {
        draft.mta.amount = BigDecimal.ZERO;
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
        draft.mty.amount = BigDecimal.fromSimple(
          (draft.mta.amount.simple * mtaBuybackPrice) /
            (draft.mty.price === 0 ? 1 : draft.mty.price),
        );
      }),
    );
  }, [state.mta.amount.exact]);

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
        draft.isError = state.mta.amount.exact.gt(state.mta.balance.exact);
      }),
    );
  }, [state.mta.amount.exact, state.mta.balance.exact]);

  useEffect(() => {
    if (!isConnected) {
      reset();
    }
  }, [isConnected, reset]);

  return [state, setState];
});
