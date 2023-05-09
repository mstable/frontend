import { useCallback } from 'react';

import produce from 'immer';

import { useUpdate } from './state';

import type { BigDecimal } from '@frontend/shared-utils';

export const useSetStep = () => {
  const update = useUpdate();

  return useCallback(
    (step: number) => {
      update(
        produce((draft) => {
          draft.step = step;
        }),
      );
    },
    [update],
  );
};

export const useSetMTAAmount = () => {
  const update = useUpdate();

  return useCallback(
    (amount: BigDecimal) => {
      update(
        produce((draft) => {
          draft.mta.amount = amount;
        }),
      );
    },
    [update],
  );
};
