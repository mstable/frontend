import { useCallback } from 'react';

import {
  coingeckoCoinIds,
  coingeckoEndpoint,
} from '@frontend/shared-constants';
import { useQuery } from '@tanstack/react-query';
import produce from 'immer';
import { prop } from 'ramda';
import axios from 'redaxios';

import { useTrackedState, useUpdate } from './state';

import type { HexAddress } from '@frontend/shared-utils';

import type { SupportedCurrency } from './types';

export const usePrices = () => useTrackedState();

export const useSetPricesChain = () => {
  const update = useUpdate();

  return useCallback(
    (chain: number) => {
      update(
        produce((state) => {
          state.chain = chain;
        }),
      );
    },
    [update],
  );
};

export const useSetPrice = () => {
  const update = useUpdate();

  return useCallback(
    (price: number) => {
      update(
        produce((state) => {
          state.price = price;
        }),
      );
    },
    [update],
  );
};

export const useSetCurrency = () => {
  const update = useUpdate();

  return useCallback(
    (currency: SupportedCurrency) => {
      update(
        produce((state) => {
          state.currency = currency;
          state.symbol = currency === 'USD' ? '$' : '€';
        }),
      );
    },
    [update],
  );
};

export const useGetPrices = (addresses: HexAddress[]) => {
  const { currency, chain } = useTrackedState();

  return useQuery({
    queryKey: [
      'getTokenPrice',
      coingeckoCoinIds[chain],
      addresses ?? [],
      currency,
    ],
    queryFn: () =>
      axios.get(
        `${coingeckoEndpoint}/simple/token_price/${
          coingeckoCoinIds[chain]
        }?contract_addresses=${(addresses ?? []).join(
          ',',
        )}&vs_currencies=${currency}`,
      ),
    select: prop('data'),
  });
};
