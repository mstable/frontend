import { useMemo, useState } from 'react';

import {
  coingeckoCoinIds,
  coingeckoEndpoint,
} from '@frontend/shared-constants';
import { axiosInstance } from '@frontend/shared-data-access';
import { usePushNotification } from '@frontend/shared-notifications';
import { useQuery } from '@tanstack/react-query';
import produce from 'immer';
import { path } from 'ramda';
import { useIntl } from 'react-intl';
import { createContainer } from 'react-tracked';
import { chainId, useBlockNumber, useNetwork } from 'wagmi';

import type { Children } from '@frontend/shared-utils';
import type { Dispatch, SetStateAction } from 'react';

import type { SupportedCurrency } from './types';

type PricesState = {
  currency: SupportedCurrency;
  symbol: '$' | '€';
  price: number | null;
};

export const { Provider, useUpdate, useTrackedState } = createContainer<
  PricesState,
  Dispatch<SetStateAction<PricesState>>,
  Children
>(() => {
  const [state, setState] = useState<PricesState>({
    currency: 'usd',
    symbol: '$',
    price: null,
  });
  const intl = useIntl();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const pushNotification = usePushNotification();
  const { chain } = useNetwork();
  const coingeckoCoinId = useMemo(
    () => coingeckoCoinIds[chain?.id ?? chainId.mainnet],
    [chain?.id],
  );
  useQuery(
    ['prices', blockNumber, state.currency, chain?.id],
    () =>
      axiosInstance.get(
        `${coingeckoEndpoint}/simple/price?ids=${coingeckoCoinId}&vs_currencies=${state.currency}`,
      ),
    {
      staleTime: 0,
      cacheTime: 0,
      onError: (err: Error) => {
        pushNotification({
          title: intl.formatMessage({
            defaultMessage: 'Error fetching prices',
          }),
          message: err?.message,
          severity: 'error',
        });
      },
      onSuccess: (data) => {
        setState(
          produce((draft) => {
            draft.price = parseFloat(
              path(['data', coingeckoCoinId, state.currency], data),
            );
          }),
        );
      },
    },
  );

  return [state, setState];
});
