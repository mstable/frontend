import { useState } from 'react';

import { createContainer } from 'react-tracked';

import type { PaletteMode, Theme } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';

type ThemeState = {
  mode: PaletteMode;
  themes: {
    light: Theme;
    dark: Theme;
  };
};

export const { Provider, useTrackedState, useUpdate } = createContainer<
  ThemeState,
  Dispatch<SetStateAction<ThemeState>>,
  { initialState: ThemeState }
>(({ initialState }) => useState(initialState));
