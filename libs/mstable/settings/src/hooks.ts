import { useCallback } from 'react';

import produce from 'immer';

import { useUpdate } from './state';

import type { Flag } from './state';

export const useToggleSettings = () => {
  const update = useUpdate();

  return useCallback(
    (flag: Flag) => {
      update(
        produce((draft) => {
          draft[flag] = !draft[flag];
        }),
      );
    },
    [update],
  );
};
