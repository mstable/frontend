import { useCallback } from 'react';

import produce from 'immer';

import { useTrackedState, useUpdate } from './state';

import type { SupportedCurrency } from './types';

export const usePrices = () => useTrackedState();

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
          state.symbol = currency === 'usd' ? '$' : '€';
        }),
      );
    },
    [update],
  );
};
