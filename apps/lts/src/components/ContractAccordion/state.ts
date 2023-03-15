import { useEffect, useMemo, useState } from 'react';

import { contracts } from '@frontend/lts-constants';
import { fetchToken } from '@wagmi/core';
import { constants } from 'ethers';
import produce from 'immer';
import { createContainer } from 'react-tracked';
import { useAccount, useContractReads, useQuery } from 'wagmi';

import type { FetchTokenResult } from '@wagmi/core';
import type { BigNumber } from 'ethers';

import type { LTSContract } from './types';

type ContractState = {
  contracts: LTSContract[];
  isLoading: boolean;
  refetch: () => void;
};

export const { Provider, useTrackedState } = createContainer(() => {
  const initialState: ContractState = useMemo(
    () => ({
      contracts: contracts.map((c) => ({
        ...c,
        balance: constants.Zero,
        token: null,
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
      chainId: c.chain,
      args: [walletAddress],
    })),
    enabled: !!walletAddress,
    watch: true,
  });

  const { data: tok, isLoading: tokLoading } = useQuery(
    ['tokens'],
    async () => {
      const promises = initialState.contracts.map((c) =>
        fetchToken({
          address: c?.stakingTokenAddress ?? c.address,
          chainId: c.chain,
        }),
      );

      return await Promise.allSettled(promises);
    },
    {
      cacheTime: Infinity,
      keepPreviousData: true,
    },
  );

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
            c.balance = bal[i] as unknown as BigNumber;
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
    if (tok) {
      setState(
        produce((draft) => {
          draft.contracts.forEach((c, i) => {
            c.token =
              tok[i].status === 'fulfilled'
                ? (tok[i] as PromiseFulfilledResult<FetchTokenResult>).value
                : {
                    address: initialState[i].address,
                    decimals: 18,
                    name: initialState[i].name,
                    symbol: 'UNKNOWN',
                    totalSupply: {
                      formatted: '',
                      value: constants.Zero,
                    },
                  };
          });
        }),
      );
    }
  }, [initialState, tok]);

  useEffect(() => {
    setState(
      produce((draft) => {
        draft.isLoading = balLoading || tokLoading;
      }),
    );
  }, [balLoading, tokLoading]);

  return [state, setState];
});
