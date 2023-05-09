import { useCallback } from 'react';

import { BigDecimal } from '@frontend/shared-utils';
import produce from 'immer';

import { useUpdate } from './state';

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
          draft.mty.amount = BigDecimal.fromSimple(
            (amount.simple * draft.mtaBuybackPrice) / draft.mty.price,
          );
        }),
      );
    },
    [update],
  );
};
