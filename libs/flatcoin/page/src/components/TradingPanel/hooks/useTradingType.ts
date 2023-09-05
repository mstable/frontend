import { useCallback } from 'react';

import { useNavigate, useSearch } from '@tanstack/react-location';
import produce from 'immer';

import type { FlatcoinRoute, TradingType } from '../../../types';

export const useTradingType = (): [
  TradingType,
  (type: TradingType) => void,
] => {
  const { action } = useSearch<FlatcoinRoute>();
  const navigate = useNavigate<FlatcoinRoute>();

  const updateTradingType = useCallback(
    (type: TradingType) => {
      navigate({
        replace: true,
        search: produce((draft) => {
          draft.action = type;
        }),
      });
    },
    [navigate],
  );

  return [
    ['deposit', 'withdraw'].includes(action) ? action : 'deposit',
    updateTradingType,
  ];
};
