import { useState } from 'react';

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
  chain: number;
  currency: SupportedCurrency;
  symbol: '$' | '€';
  price: number | null;
};

export const { Provider, useUpdate, useTrackedState } = createContainer<
  PricesState,
  Dispatch<SetStateAction<PricesState>>,
  Children & { chainId?: number }
>(({ chainId }) => {
  const { chain } = useNetwork();
  const [state, setState] = useState<PricesState>({
    chain: chainId ?? chain?.id ?? mainnet.id,
    currency: 'USD',
    symbol: '$',
    price: null,
  });

  useQuery(
    ['prices', state.currency, state.chain],
    () =>
      axios.get(
        `${coingeckoEndpoint}/simple/price?ids=${
          coingeckoCoinIds[state.chain]
        }&vs_currencies=${state.currency}`,
      ),
    {
      refetchInterval: 30e3,
      onSuccess: (data) => {
        setState(
          produce((draft) => {
            draft.price = parseFloat(
              path(
                [
                  'data',
                  coingeckoCoinIds[state.chain],
                  state.currency.toLowerCase(),
                ],
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
