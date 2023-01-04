import { useCallback } from 'react';

import produce from 'immer';

import { useUpdate } from './state';

import type { PaletteMode } from '@mui/material';

export const useSetThemeMode = () => {
  const update = useUpdate();

  return useCallback(
    (mode: PaletteMode) => {
      update(
        produce((draft) => {
          draft.mode = mode;
        }),
      );
    },
    [update],
  );
};

export const useToggleThemeMode = () => {
  const update = useUpdate();

  return useCallback(() => {
    update(
      produce((draft) => {
        draft.mode = draft.mode === 'dark' ? 'light' : 'dark';
      }),
    );
  }, [update]);
};
