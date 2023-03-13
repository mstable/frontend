import { useEffect, useState } from 'react';

import { contracts } from '@frontend/lts-constants';
import { fetchToken } from '@wagmi/core';
import { constants } from 'ethers';
import produce from 'immer';
import { createContainer } from 'react-tracked';
import { useAccount, useContractReads, useQuery } from 'wagmi';

import type { FetchTokenResult } from '@wagmi/core';
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
      setState(
        produce((draft) => {
          draft.forEach((c, i) => {
            c.balance = data[i] as unknown as BigNumber;
          });
        }),
      );
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

      return await Promise.allSettled(promises);
    },
    {
      cacheTime: Infinity,
      keepPreviousData: true,
      onSuccess: (data) => {
        setState(
          produce((draft) => {
            draft.forEach((c, i) => {
              c.token =
                data[i].status === 'fulfilled'
                  ? (data[i] as PromiseFulfilledResult<FetchTokenResult>).value
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
      },
    },
  );

  useEffect(() => {
    if (!isConnected) {
      setState(
        produce((draft) => {
          draft.forEach((c) => {
            c.balance = constants.Zero;
          });
        }),
      );
    }
  }, [isConnected, walletAddress]);

  return [state, setState];
});
