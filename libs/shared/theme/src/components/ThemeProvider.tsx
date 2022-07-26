import { useMemo } from 'react';

import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
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
      {!disableBaseStyles && (
        <>
          <CssBaseline enableColorScheme />
          <GlobalStyles
            styles={{
              'html body #root': {
                width: '100%',
                height: '100%',
              },
            }}
          />
        </>
      )}
      {children}
    </MuiThemeProvider>
  );
};

export const ThemeProvider = ({
  defaultMode: mode = 'light',
  themes = { light, dark },
  ...rest
}: ThemeProviderProps) => (
  <Provider initialState={{ mode, themes }}>
    <ThemeWrapped {...rest} />
  </Provider>
);
