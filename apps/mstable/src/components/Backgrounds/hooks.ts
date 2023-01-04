import { useCallback } from 'react';

import produce from 'immer';

import { useUpdate } from './state';

export const useTransitionBackgroundColor = () => {
  const update = useUpdate();

  return useCallback(
    (color: string | null) => {
      update(
        produce((draft) => {
          draft.next = color;
        }),
      );
    },
    [update],
  );
};
