import { useEffect, useMemo, useState } from 'react';

import { contracts } from '@frontend/lts-constants';
import { fetchToken } from '@wagmi/core';
import { constants } from 'ethers';
import { createContainer } from 'react-tracked';
import { useAccount, useContractReads, useNetwork, useQuery } from 'wagmi';

import type { BigNumber } from 'ethers';

import type { LTSContract } from './types';

export const { Provider, useTrackedState } = createContainer(() => {
  const { chain } = useNetwork();
  const initialState = useMemo(
    () =>
      (contracts[chain?.id] ?? []).map((c) => ({
        ...c,
        balance: constants.Zero,
        token: null,
      })),
    [chain?.id],
  );
  const [state, setState] = useState<LTSContract[]>(initialState);
  const { address: walletAddress, isConnected } = useAccount();

  const { refetch } = useContractReads({
    contracts: state.map((c) => ({
      address: c.address,
      functionName: c?.balanceFn ?? 'balanceOf',
      abi: c.abi,
      args: [walletAddress],
    })),
    enabled: isConnected,
    onSuccess: (data) => {
      setState((prev) =>
        prev.map((c, i) => ({
          ...c,
          balance: data[i] as unknown as BigNumber,
        })),
      );
    },
  });

  useQuery(
    ['tokens'],
    async () => {
      const promises = state.map((c) =>
        fetchToken({ address: c?.stakingTokenAddress ?? c.address }),
      );

      return await Promise.all(promises);
    },
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      onSuccess: (data) => {
        setState((prev) => prev.map((c, i) => ({ ...c, token: data[i] })));
      },
    },
  );

  useEffect(() => {
    if (!isConnected) {
      setState((prev) => prev.map((c) => ({ ...c, balance: constants.Zero })));
    } else {
      refetch();
    }
  }, [isConnected, refetch]);

  return [state, setState];
});
