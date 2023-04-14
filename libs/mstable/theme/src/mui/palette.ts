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
      light: colors.black700,
      main: colors.black900,
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
    icons: {
      color: colors.black600,
      background: colors.black100,
      revertedColor: colors.black50,
      revertedBackground: colors.black900,
    },
    grey: {
      '50': colors.black50,
      '100': colors.black100,
      '200': colors.black200,
      '300': colors.black300,
      '400': colors.black400,
      '500': colors.black500,
      '600': colors.black600,
      '700': colors.black700,
      '800': colors.black800,
      '900': colors.black900,
      A100: colors.lightGrey01,
      A200: colors.lightGrey02,
      A400: colors.lightGrey03,
      A700: colors.lightGrey04,
    },
    text: {
      primary: colors.black900,
      secondary: colors.black600,
      disabled: colors.black400,
    },
    background: {
      default: colors.black50,
      paper: colors.black50,
      highlight: colors.black100,
    },
    divider: colors.black100,
    action: {
      active: alpha(colors.blue02, 0.5),
      activatedOpacity: 0.5,
      hover: alpha(colors.black800, 0.1),
      hoverOpacity: 0.06,
      selected: alpha(colors.blue01, 0.1),
      selectedOpacity: 0.1,
      disabled: colors.black200,
      disabledBackground: colors.black200,
      disabledOpacity: 0.25,
      focus: alpha(colors.blue02, 0.06),
      focusOpacity: 0.06,
    },
  },
};

const dark: ThemeOptions = mergeDeepRight(light, {
  palette: {
    mode: 'dark' as PaletteMode,
    secondary: {
      light: colors.white,
      main: colors.black50,
      dark: colors.black300,
      contrastText: colors.offBlack,
    },
    icons: {
      color: colors.black600,
      background: colors.black800,
      revertedColor: colors.black900,
      revertedBackground: colors.black50,
    },
    text: {
      primary: colors.black50,
      secondary: colors.black500,
      disabled: colors.black600,
    },
    background: {
      default: colors.black900,
      paper: colors.black900,
      highlight: colors.black800,
    },
    divider: colors.black800,
    action: {
      disabled: colors.black700,
      disabledBackground: colors.black700,
    },
  },
});

export const getPaletteOptions = (mode: PaletteMode) =>
  mode === 'dark' ? dark : light;
