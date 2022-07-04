import { useCallback } from 'react';

import produce from 'immer';

import { useUpdate } from './state';

import type { PaletteMode } from '@mui/material';

export const useSwitchThemeMode = () => {
  const update = useUpdate();

  return useCallback(
    (mode?: PaletteMode) => {
      update(
        produce((draft) => {
          draft.mode = mode ?? draft.mode === 'dark' ? 'light' : 'dark';
        }),
      );
    },
    [update],
  );
};
