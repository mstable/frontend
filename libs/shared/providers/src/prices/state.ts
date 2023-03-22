import { useState } from 'react';

import { createContainer } from 'react-tracked';

import type { Dispatch, SetStateAction } from 'react';

import type { SupportedCurrency } from './types';

type PricesState = {
  currency: SupportedCurrency;
  symbol: '$' | '€';
};

export const {
  Provider,
  useUpdate,
  useTrackedState: usePrices,
} = createContainer<PricesState, Dispatch<SetStateAction<PricesState>>, null>(
  () =>
    useState<PricesState>({
      currency: 'USD',
      symbol: '$',
    }),
);
