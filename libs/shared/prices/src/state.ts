import { useMemo, useState } from 'react';

import {
  coingeckoCoinIds,
  coingeckoEndpoint,
} from '@frontend/shared-constants';
import { axiosInstance } from '@frontend/shared-data-access';
import { useQuery } from '@tanstack/react-query';
import produce from 'immer';
import { path } from 'ramda';
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
    currency: 'USD',
    symbol: '$',
    price: null,
  });
  const { data: blockNumber } = useBlockNumber({ watch: true });
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
      onSuccess: (data) => {
        setState(
          produce((draft) => {
            draft.price = parseFloat(
              path(
                ['data', coingeckoCoinId, state.currency.toLowerCase()],
                data,
              ),
            );
          }),
        );
      },
    },
  );

  return [state, setState];
});
