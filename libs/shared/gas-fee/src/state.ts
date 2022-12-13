import { useState } from 'react';

import { etherscanApiEndpoints } from '@frontend/shared-constants';
import { useQuery } from '@tanstack/react-query';
import produce from 'immer';
import { pathOr } from 'ramda';
import { createContainer } from 'react-tracked';
import axios from 'redaxios';
import { chainId, useNetwork } from 'wagmi';

import type { Children } from '@frontend/shared-utils';
import type { Dispatch, SetStateAction } from 'react';

import type { GasPriceConfig } from './types';

type GasFeeState = {
  [key in GasPriceConfig]: string;
};

export const { Provider, useUpdate, useTrackedState } = createContainer<
  GasFeeState,
  Dispatch<SetStateAction<GasFeeState>>,
  Children
>(() => {
  const [state, setState] = useState<GasFeeState>({
    fast: '0',
    average: '0',
    slow: '0',
  });
  const { chain } = useNetwork();
  useQuery(
    ['gas-fee', chain?.id],
    () =>
      axios.get(
        `${
          etherscanApiEndpoints[chain?.id ?? chainId.mainnet]
        }/api?module=gastracker&action=gasoracle`,
      ),
    {
      refetchInterval: 30e3,
      onSuccess: (data) => {
        setState(
          produce((draft) => {
            draft.fast = pathOr(
              draft.fast,
              ['data', 'result', 'FastGasPrice'],
              data,
            );
            draft.average = pathOr(
              draft.average,
              ['data', 'result', 'ProposeGasPrice'],
              data,
            );
            draft.slow = pathOr(
              draft.slow,
              ['data', 'result', 'SafeGasPrice'],
              data,
            );
          }),
        );
      },
    },
  );

  return [state, setState];
});
