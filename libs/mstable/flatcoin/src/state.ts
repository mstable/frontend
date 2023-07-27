import { useEffect, useState } from 'react';

import { useSearch } from '@tanstack/react-location';
import produce from 'immer';
import { createContainer } from 'react-tracked';

import type { Dispatch, SetStateAction } from 'react';

import type { PositionType } from './types';
import type { FlatcoinRoute, Position } from './types';

type FlatcoinState = {
  data: {
    apy?: string;
    tvl?: string;
  };
  configs: Record<PositionType, any>;
  positions?: Position[];
  type: PositionType;
};

export const {
  Provider: FlatcoinProvider,
  useUpdate: useUpdateFlatcoin,
  useTrackedState: useFlatcoin,
} = createContainer<
  FlatcoinState,
  Dispatch<SetStateAction<FlatcoinState>>,
  { initialState: { configs: FlatcoinState['configs'] } }
>(({ initialState }) => {
  const { type } = useSearch<FlatcoinRoute>();

  const [state, setState] = useState<FlatcoinState>({
    type,
    configs: initialState.configs,
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
        type: 'leveragedeth',
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
        type: 'flatcoin',
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

  useEffect(() => {
    setState(
      produce((draft) => {
        draft.type = ['flatcoin', 'leveragedeth'].includes(type)
          ? type
          : 'flatcoin';
      }),
    );
  }, [type]);

  return [state, setState];
});
