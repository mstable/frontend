import { useEffect, useState } from 'react';

import {
  cons,
  tokens,
  VELODROME_PAIRS_API_ENDPOINT,
} from '@frontend/shared-constants';
import { BigDecimal } from '@frontend/shared-utils';
import { useQuery } from '@tanstack/react-query';
import produce from 'immer';
import { createContainer } from 'react-tracked';
import { useAccount, useContractRead, useNetwork } from 'wagmi';
import { mainnet, optimism } from 'wagmi/chains';

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
  mtaBuybackPrice: number;
  mta: InputProps;
  mty: InputProps;
};

export const { Provider, useTrackedState, useUpdate } = createContainer(() => {
  const { chain } = useNetwork();
  const { address: walletAddress, isConnected } = useAccount();

  const MTyPool =
    cons[optimism.id]['0x0F6eAe52ae1f94Bc759ed72B201A2fDb14891485'];
  const L1Comptroller =
    cons[mainnet.id]['0x3509816328cf50Fed7631c2F5C9a18c75cd601F0'];
  const L2Comptroller =
    cons[optimism.id]['0x3509816328cf50Fed7631c2F5C9a18c75cd601F0'];

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
  });

  const { data: all } = useContractRead({
    address: state.mta.contract.address,
    abi: state.mta.contract.abi,
    functionName: 'allowance',
    args: [
      walletAddress,
      chain?.id === mainnet.id ? L1Comptroller.address : L2Comptroller.address,
    ],
    enabled: isConnected,
    watch: true,
    cacheOnBlock: true,
  });

  useEffect(() => {
    if (all) {
      setState(
        produce((draft) => {
          draft.needsApproval = state.mta.amount.exact.gt(
            new BigDecimal(
              all as unknown as BigNumberish,
              state.mta.contract.decimals,
            ).exact,
          );
        }),
      );
    }
  }, [all, state.mta.amount.exact, state.mta.contract.decimals]);

  const { data: balMTA, isLoading: balMTALoading } = useContractRead({
    address: state.mta.contract.address,
    abi: state.mta.contract.abi,
    chainId: state.mta.contract.chainId,
    functionName: 'balanceOf',
    args: [walletAddress],
  });

  useEffect(() => {
    if (balMTA) {
      setState(
        produce((draft) => {
          draft.mta.balance = new BigDecimal(
            balMTA as unknown as BigNumberish,
            state.mta.contract.decimals,
          );
        }),
      );
    }
  }, [balMTA, state.mta.contract.decimals]);

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

  const { data: balMTy, isLoading: balMTyLoading } = useContractRead({
    address: state.mty.contract.address,
    abi: state.mty.contract.abi,
    chainId: state.mty.contract.chainId,
    functionName: 'balanceOf',
    args: [walletAddress],
  });

  useEffect(() => {
    if (balMTy) {
      setState(
        produce((draft) => {
          draft.mty.balance = new BigDecimal(
            balMTy as unknown as BigNumberish,
            state.mty.contract.decimals,
          );
        }),
      );
    }
  }, [balMTy, state.mty.contract.decimals]);

  const { data: mtyPrice, isLoading: mtyPriceLoading } = useContractRead({
    address: MTyPool.address,
    abi: MTyPool.abi,
    chainId: MTyPool.chainId,
    functionName: 'tokenPrice',
  });

  useEffect(() => {
    if (mtyPrice) {
      setState(
        produce((draft) => {
          draft.mty.price = new BigDecimal(
            mtyPrice as unknown as BigNumberish,
            draft.mty.contract.decimals,
          ).simple;
        }),
      );
    }
  }, [mtyPrice]);

  useEffect(() => {
    setState(
      produce((draft) => {
        draft.isLoading =
          balMTALoading || veloLoading || balMTyLoading || mtyPriceLoading;
      }),
    );
  }, [balMTALoading, balMTyLoading, mtyPriceLoading, veloLoading]);

  useEffect(() => {
    setState(
      produce((draft) => {
        draft.isError = state.mta.amount.exact.gt(state.mta.balance.exact);
      }),
    );
  }, [state.mta.amount.exact, state.mta.balance.exact]);

  useEffect(() => {
    if (!isConnected) {
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
    }
  }, [isConnected]);

  return [state, setState];
});
