import { useMemo, useState } from 'react';

import {
  coingeckoCoinIds,
  coingeckoEndpoint,
} from '@frontend/shared-constants';
import { useQuery } from '@tanstack/react-query';
import produce from 'immer';
import { path } from 'ramda';
import { createContainer } from 'react-tracked';
import axios from 'redaxios';
import { useNetwork } from 'wagmi';
import { mainnet } from 'wagmi/chains';

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
  const { chain } = useNetwork();
  const coingeckoCoinId = useMemo(
    () => coingeckoCoinIds[chain?.id ?? mainnet.id],
    [chain?.id],
  );
  useQuery(
    ['prices', state.currency, chain?.id],
    () =>
      axios.get(
        `${coingeckoEndpoint}/simple/price?ids=${coingeckoCoinId}&vs_currencies=${state.currency}`,
      ),
    {
      refetchInterval: 30e3,
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
