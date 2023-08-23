import { useCallback } from 'react';

import { useNavigate, useSearch } from '@tanstack/react-location';
import produce from 'immer';

import type { FlatcoinRoute } from '../types';
import type { PositionType } from '../types';

export const useFlatcoinType = (): [
  PositionType,
  (type: PositionType) => void,
] => {
  const { type } = useSearch<FlatcoinRoute>();
  const navigate = useNavigate<FlatcoinRoute>();

  const updateFlatcoinType = useCallback(
    (type: PositionType) => {
      navigate({
        replace: true,
        search: produce((draft) => {
          draft.type = type;
        }),
      });
    },
    [navigate],
  );

  return [
    ['flatcoin', 'leveragedeth'].includes(type) ? type : 'flatcoin',
    updateFlatcoinType,
  ];
};
