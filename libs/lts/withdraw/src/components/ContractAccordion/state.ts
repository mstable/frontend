import { useEffect, useMemo, useState } from 'react';

import { contracts } from '@frontend/lts-constants';
import { constants } from 'ethers';
import produce from 'immer';
import { createContainer } from 'react-tracked';
import { mainnet, useAccount, useContractReads } from 'wagmi';

import type { BigNumber } from 'ethers';

import type { LTSContract } from './types';

type ContractState = {
  chainId: number;
  contracts: LTSContract[];
  isLoading: boolean;
  refetch: () => void;
};

export const { Provider, useTrackedState, useUpdate } = createContainer(() => {
  const initialState: ContractState = useMemo(
    () => ({
      chainId: mainnet.id,
      contracts: contracts.map((c) => ({
        ...c,
        balance: constants.Zero,
      })),
      isLoading: true,
      refetch: null,
    }),
    [],
  );
  const [state, setState] = useState<ContractState>(initialState);
  const { address: walletAddress, isConnected } = useAccount();

  const {
    data: bal,
    isLoading: balLoading,
    refetch,
  } = useContractReads({
    contracts: initialState.contracts.map((c) => ({
      address: c.address,
      functionName: c?.balanceFn ?? 'balanceOf',
      abi: c.abi,
      chainId: c.chainId,
      args: [walletAddress],
    })),
    select(res) {
      return res.map((r, i) =>
        initialState.contracts[i]?.balanceSelect
          ? initialState.contracts[i].balanceSelect(r)
          : r,
      );
    },
    enabled: !!walletAddress,
    watch: true,
  });

  useEffect(() => {
    if (!isConnected) {
      setState(
        produce((draft) => {
          draft.contracts.forEach((c) => {
            c.balance = constants.Zero;
          });
        }),
      );
    }
  }, [isConnected, walletAddress]);

  useEffect(() => {
    if (bal) {
      setState(
        produce((draft) => {
          draft.contracts.forEach((c, i) => {
            c.balance = (bal[i] ?? constants.Zero) as BigNumber;
          });
        }),
      );
    }
  }, [bal]);

  useEffect(() => {
    if (refetch) {
      setState(
        produce((draft) => {
          draft.refetch = refetch;
        }),
      );
    }
  }, [refetch]);

  useEffect(() => {
    setState(
      produce((draft) => {
        draft.isLoading = balLoading;
      }),
    );
  }, [balLoading]);

  return [state, setState];
});
