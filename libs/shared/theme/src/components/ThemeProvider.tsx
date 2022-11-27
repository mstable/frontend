import { useMemo } from 'react';

import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  useMediaQuery,
} from '@mui/material';
import { clone } from 'ramda';

import { dark, light } from '../mui';
import { Provider, useTrackedState } from '../state';

import type { Children } from '@frontend/shared-utils';
import type { PaletteMode, Theme } from '@mui/material';

export interface ThemeProviderProps extends Children {
  defaultMode?: PaletteMode;
  themes?: {
    light: Theme;
    dark: Theme;
  };
  disableBaseStyles?: boolean;
}

type ThemeWrappedProps = {
  disableBaseStyles?: boolean;
} & Children;

const ThemeWrapped = ({
  disableBaseStyles = false,
  children,
}: ThemeWrappedProps) => {
  const { mode, themes } = useTrackedState();
  const currentTheme = useMemo(() => clone(themes[mode]), [mode, themes]);

  return (
    <MuiThemeProvider theme={currentTheme}>
      {!disableBaseStyles && <CssBaseline enableColorScheme />}
      {children}
    </MuiThemeProvider>
  );
};

export const ThemeProvider = ({
  defaultMode,
  themes = { light, dark },
  ...rest
}: ThemeProviderProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const mode = useMemo(
    () => (defaultMode ?? prefersDarkMode ? 'dark' : 'light'),
    [defaultMode, prefersDarkMode],
  );

  return (
    <Provider initialState={{ mode, themes }}>
      <ThemeWrapped {...rest} />
    </Provider>
  );
};
