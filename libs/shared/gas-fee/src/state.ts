import { useState } from 'react';

import { etherscanApiEndpoints } from '@frontend/shared-constants';
import { axiosInstance } from '@frontend/shared-data-access';
import { usePushNotification } from '@frontend/shared-notifications';
import { useQuery } from '@tanstack/react-query';
import produce from 'immer';
import { pathOr } from 'ramda';
import { useIntl } from 'react-intl';
import { createContainer } from 'react-tracked';
import { chainId, useBlockNumber, useNetwork } from 'wagmi';

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
  const intl = useIntl();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const pushNotification = usePushNotification();
  const { chain } = useNetwork();
  useQuery(
    ['gas-fee', blockNumber, chain?.id],
    () =>
      axiosInstance.get(
        `${
          etherscanApiEndpoints[chain?.id ?? chainId.mainnet]
        }/api?module=gastracker&action=gasoracle`,
      ),
    {
      staleTime: 0,
      cacheTime: 0,
      onError: (err: Error) => {
        pushNotification({
          title: intl.formatMessage({
            defaultMessage: 'Error fetching gas fee',
          }),
          message: err?.message,
          severity: 'error',
        });
      },
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
