import { useCallback } from 'react';

import { cons } from '@frontend/shared-constants';
import produce from 'immer';
import { useAccount, useNetwork, usePrepareContractWrite } from 'wagmi';
import { mainnet, optimism } from 'wagmi/chains';

import { useTrackedState, useUpdate } from './state';

import type { BigDecimal } from '@frontend/shared-utils';

export const useSetStep = () => {
  const update = useUpdate();

  return useCallback(
    (step: number) => {
      update(
        produce((draft) => {
          draft.step = step;
        }),
      );
    },
    [update],
  );
};

export const useSetMTAAmount = () => {
  const update = useUpdate();

  return useCallback(
    (amount: BigDecimal) => {
      update(
        produce((draft) => {
          draft.mta.amount = amount;
        }),
      );
    },
    [update],
  );
};

export const usePrepareMTABuyback = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { mta } = useTrackedState();

  const configMainnet = {
    address: cons[mainnet.id]['L1Comptroller'].address,
    abi: cons[mainnet.id]['L1Comptroller'].abi,
    functionName: 'buyBackOnL2',
    args: [address, mta.amount.exact],
  };

  const configOptimism = {
    address: cons[optimism.id]['L2Comptroller'].address,
    abi: cons[optimism.id]['L2Comptroller'].abi,
    functionName: 'buyback',
    args: [address, mta.amount.exact],
  };

  return usePrepareContractWrite({
    ...(chain?.id === optimism.id ? configOptimism : configMainnet),
  });
};
