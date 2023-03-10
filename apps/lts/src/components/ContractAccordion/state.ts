import { useEffect, useState } from 'react';

import { contracts } from '@frontend/lts-constants';
import { fetchToken } from '@wagmi/core';
import { constants } from 'ethers';
import { createContainer } from 'react-tracked';
import { useAccount, useContractReads, useQuery } from 'wagmi';

import type { BigNumber } from 'ethers';

import type { LTSContract } from './types';

export const { Provider, useTrackedState } = createContainer(() => {
  const initialState = contracts.map((c) => ({
    ...c,
    balance: constants.Zero,
    token: null,
  }));
  const [state, setState] = useState<LTSContract[]>(initialState);
  const { address: walletAddress, isConnected } = useAccount();

  console.log('state ', initialState, state);

  useContractReads({
    contracts: initialState.map((c) => ({
      address: c.address,
      functionName: c?.balanceFn ?? 'balanceOf',
      abi: c.abi,
      chainId: c.chain,
      args: [walletAddress],
    })),
    enabled: !!walletAddress,
    onSuccess: (data) => {
      console.log('success balances', data);
      setState((prev) => {
        console.log('prev ', prev);
        return prev.map((c, i) => ({
          ...c,
          balance: data[i] as unknown as BigNumber,
        }));
      });
    },
  });

  useQuery(
    ['tokens'],
    async () => {
      const promises = initialState.map((c) =>
        fetchToken({
          address: c?.stakingTokenAddress ?? c.address,
          chainId: c.chain,
        }),
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
    }
  }, [isConnected, walletAddress]);

  return [state, setState];
});
