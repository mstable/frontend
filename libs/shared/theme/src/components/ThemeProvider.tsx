import { useMemo } from 'react';

import {
  CssBaseline,
  GlobalStyles,
  keyframes,
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

const gradient = keyframes`
	0% {
		background-position: 0% 50%;
	}  
  25% {
		background-position: 50% 40%;
	}  
	50% {
		background-position: 100% 50%;
	}
  75% {
		background-position: 50% 60%;
	}  
	100% {
		background-position: 0% 50%;
	}
`;

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
              'html, body': {
                width: '100%',
                height: '100%',
              },
              '#root': {
                width: '100%',
                height: '100%',
                background: [
                  currentTheme.mixins.gradients.numbTop,
                  currentTheme.mixins.gradients.numbBottom,
                  currentTheme.mixins.gradients.colorCloud,
                ].join(','),
                animation: `${gradient} 240s ease infinite`,
                backgroundSize: '200% 100%',
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
