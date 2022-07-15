import { alpha } from '@mui/material';
import { mergeDeepRight } from 'ramda';

import { colors } from '../constants';

import type { PaletteMode, ThemeOptions } from '@mui/material';

const light: ThemeOptions = {
  palette: {
    mode: 'light',
    common: {
      white: colors.white,
      black: colors.black,
    },
    primary: {
      light: colors.blue01,
      main: colors.blue02,
      dark: colors.blue03,
      contrastText: colors.white,
    },
    secondary: {
      light: colors.grey08,
      main: colors.grey10,
      dark: colors.offBlack,
      contrastText: colors.white,
    },
    error: {
      light: colors.red01,
      main: colors.red02,
      dark: colors.red03,
      contrastText: colors.white,
    },
    warning: {
      light: colors.yellow01,
      main: colors.yellow02,
      dark: colors.yellow03,
      contrastText: colors.white,
    },
    info: {
      light: colors.purple01,
      main: colors.purple02,
      dark: colors.purple03,
      contrastText: colors.white,
    },
    success: {
      light: colors.green01,
      main: colors.green02,
      dark: colors.green03,
      contrastText: colors.white,
    },

    grey: {
      '50': colors.grey01,
      '100': colors.grey02,
      '200': colors.grey03,
      '300': colors.grey04,
      '400': colors.grey05,
      '500': colors.grey06,
      '600': colors.grey07,
      '700': colors.grey08,
      '800': colors.grey09,
      '900': colors.grey10,
      A100: colors.lightGrey01,
      A200: colors.lightGrey02,
      A400: colors.lightGrey03,
      A700: colors.lightGrey04,
    },
    text: {
      primary: colors.offBlack,
      secondary: colors.offBlackAccent,
      disabled: colors.grey03,
    },
    background: {
      default: colors.white,
      paper: colors.white,
      highlight: colors.grey01,
    },
    divider: colors.grey03,
    action: {
      active: alpha(colors.blue02, 0.5),
      activatedOpacity: 0.5,
      hover: alpha(colors.grey02, 0.06),
      hoverOpacity: 0.06,
      selected: alpha(colors.blue01, 0.1),
      selectedOpacity: 0.1,
      disabled: colors.grey03,
      disabledBackground: alpha(colors.lightGrey04, 0.12),
      disabledOpacity: 0.25,
      focus: alpha(colors.blue02, 0.06),
      focusOpacity: 0.06,
    },
  },
};

const dark: ThemeOptions = mergeDeepRight(light, {
  palette: {
    mode: 'dark',
    secondary: {
      light: colors.white,
      main: colors.grey01,
      dark: colors.grey04,
      contrastText: colors.offBlack,
    },
    text: {
      primary: colors.white,
      secondary: colors.grey05,
      disabled: colors.grey04,
    },
    background: {
      default: colors.grey10,
      paper: colors.grey08,
      highlight: colors.grey07,
    },
    divider: colors.grey01,
  },
});

export const getPaletteOptions = (mode: PaletteMode) =>
  mode === 'dark' ? dark : light;
