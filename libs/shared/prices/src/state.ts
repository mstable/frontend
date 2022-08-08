import { useState } from 'react';

import { createContainer } from 'react-tracked';

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
>(() =>
  useState({
    currency: 'usd',
    symbol: '$',
    price: null,
  }),
);
