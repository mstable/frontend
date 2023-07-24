import { useState } from 'react';
import { createContainer } from 'react-tracked';

import type { Dispatch, SetStateAction } from 'react';
import { Position, PositionType } from './types';

type FlatcoinState = {
  data: {
    apy?: string;
    tvl?: string;
  };
  config: any;
  positions?: Position[];
};

export const {
  Provider: FlatcoinProvider,
  useUpdate: useUpdateFlatcoin,
  useTrackedState: useFlatcoin,
} = createContainer<
  FlatcoinState,
  Dispatch<SetStateAction<FlatcoinState>>,
  { initialState: { config: unknown } }
>(({ initialState }) => {
  const [state, setState] = useState<FlatcoinState>({
    config: initialState.config,
    data: {
      apy: new Intl.NumberFormat('en-US', { style: 'percent' }).format(0.152),
      tvl: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        compactDisplay: 'short',
      }).format(1234567),
    },
    positions: [
      {
        type: PositionType.LeveragedETH,
        value: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          compactDisplay: 'short',
          minimumFractionDigits: 2,
        }).format(1000),
        date: new Date().toLocaleString(),
        leverageMultiplier: new Intl.NumberFormat('en-US', {
          compactDisplay: 'short',
          minimumFractionDigits: 1,
        }).format(10),
        liquidation: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          compactDisplay: 'short',
        }).format(1000),
        profitLossTotal: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          compactDisplay: 'short',
          signDisplay: 'always',
        }).format(100),
        profitLossFunding: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          compactDisplay: 'short',
          signDisplay: 'always',
        }).format(-20),
      },
      {
        type: PositionType.Flatcoin,
        value: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          compactDisplay: 'short',
          minimumFractionDigits: 2,
        }).format(1000),
        date: new Date().toLocaleString(),
        profitLossTotal: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          compactDisplay: 'short',
          signDisplay: 'always',
        }).format(100),
        profitLossFunding: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          compactDisplay: 'short',
          signDisplay: 'always',
        }).format(20),
      },
    ],
  });

  return [state, setState];
});
