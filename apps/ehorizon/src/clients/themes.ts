import '@fontsource/roboto';
import '@fontsource/roboto-mono';

import { light } from '@frontend/mstable-theme';
import { createTheme } from '@mui/material';

export const colors = {
  black: '#000000',
  blue: '#88B4F5',
  greenLight: '#99FFF1',
  green: '#00F5D4',
  greenDark: '#00B89F',
  textSecondary: '#768390',
  white: '#ffffff',
  '50': '#FDFFFC',
  '100': '#252528',
  '200': '#28282C',
  '300': '#18181B',
  '400': '#0C0C0E',
  '500': '#0C0C0D',
};

export const fontFamilies = {
  main: ['Roboto', 'open sans'].join(','),
  mono: ['Roboto Mono', 'monospace'].join(','),
};

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
};

export const themes = {
  light,
  dark: createTheme({
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
          variant: 'contained',
          color: 'secondary',
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
          disableTouchRipple: true,
        },
      },
    },
    palette: {
      primary: {
        main: colors.blue,
      },
      secondary: {
        main: colors['200'],
      },
      background: {
        default: '#000',
        paper: colors['400'],
      },
      text: {
        primary: colors.white,
        secondary: colors.textSecondary,
      },
      divider: '#000',
    },
    shape: {
      borderRadius: 0,
    },
    typography: {
      fontFamily: fontFamilies.main,

      fontWeightLight: fontWeights.regular,
      fontWeightRegular: fontWeights.medium,
      fontWeightMedium: fontWeights.semibold,
      fontWeightBold: fontWeights.bold,

      fontSize: 16,

      allVariants: {
        lineHeight: 1.25,
        fontWeight: fontWeights.medium,
        fontFamily: fontFamilies.main,
      },

      h1: {
        fontSize: 40,
        lineHeight: 1.285,
        fontWeight: fontWeights.medium,
        fontFamily: fontFamilies.mono,
      },
      h2: {
        fontSize: 32,
        lineHeight: 1.285,
        fontWeight: fontWeights.medium,
        fontFamily: fontFamilies.mono,
      },
      h3: {
        fontSize: 24,
        lineHeight: 1.285,
        fontWeight: fontWeights.medium,
        fontFamily: fontFamilies.main,
      },
      h4: {
        fontSize: 22,
        lineHeight: 1.29,
        fontWeight: fontWeights.medium,
        fontFamily: fontFamilies.main,
      },
      h5: {
        fontSize: 20,
        lineHeight: 1.208,
        fontWeight: fontWeights.semibold,
        fontFamily: fontFamilies.main,
      },
      h6: {
        fontSize: 18,
        lineHeight: 1.25,
        fontWeight: fontWeights.medium,
        fontFamily: fontFamilies.main,
      },
      body1: {
        fontSize: 16,
        fontFamily: fontFamilies.main,
      },
      body2: {
        fontSize: 16,
        fontFamily: fontFamilies.mono,
      },
      caption: {
        fontSize: 14,
        color: colors.textSecondary,
        fontFamily: fontFamilies.main,
        fontWeight: fontWeights.medium,
      },
    },
  }),
};
