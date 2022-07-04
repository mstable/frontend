import '@fontsource/plus-jakarta-sans';
import '@fontsource/plus-jakarta-sans/variable.css';
import '@fontsource/pt-mono';

import {
  fontFamilies,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
} from '../constants';

import type { ThemeOptions } from '@mui/material';

const defaultTypographyVariant = {
  fontFamily: fontFamilies.main,
  fontSize: 16,
  fontWeight: fontWeights.medium,
};

export const getTypographyOptions = (base?: ThemeOptions): ThemeOptions => ({
  typography: {
    fontFamily: fontFamilies.main,

    fontWeightLight: fontWeights.light,
    fontWeightRegular: fontWeights.medium,
    fontWeightMedium: fontWeights.semibold,
    fontWeightBold: fontWeights.bold,

    fontSizes,
    fontFamilies,
    lineHeights,
    letterSpacings,

    h1: {
      fontFamily: fontFamilies.main,
      fontSize: 67,
      fontWeight: fontWeights.extrabold,
    },
    h2: {
      fontFamily: fontFamilies.main,
      fontSize: 50,
      fontWeight: fontWeights.extrabold,
    },
    h3: {
      fontFamily: fontFamilies.main,
      fontSize: 38,
      fontWeight: fontWeights.bold,
    },
    h4: {
      fontFamily: fontFamilies.main,
      fontSize: 28,
      fontWeight: fontWeights.semibold,
    },
    h5: {
      fontFamily: fontFamilies.main,
      fontSize: 21,
      fontWeight: fontWeights.bold,
    },
    h6: {
      fontFamily: fontFamilies.main,
      fontSize: 21,
      fontWeight: fontWeights.semibold,
    },
    subtitle1: defaultTypographyVariant,
    subtitle2: defaultTypographyVariant,
    body1: defaultTypographyVariant,
    body2: { ...defaultTypographyVariant, fontSize: 14 },
    button: {
      ...defaultTypographyVariant,
      lineHeight: '16px',
      textTransform: 'none',
      fontWeight: fontWeights.bold,
    },
    caption: {
      fontFamily: fontFamilies.main,
      fontSize: 12,
      fontWeight: fontWeights.semibold,
    },
    overline: {
      fontFamily: fontFamilies.main,
      fontSize: 14,
      fontWeight: fontWeights.semibold,
      letterSpacing: '5%',
    },
    value1: {
      fontFamily: fontFamilies.code,
      fontSize: 28,
      fontWeight: fontWeights.medium,
    },
    value2: {
      fontFamily: fontFamilies.code,
      fontSize: 21,
      fontWeight: fontWeights.medium,
    },
    value3: {
      fontFamily: fontFamilies.main,
      fontSize: 16,
      fontWeight: fontWeights.medium,
    },
    value4: {
      fontFamily: fontFamilies.main,
      fontSize: 14,
      fontWeight: fontWeights.bold,
    },
    value5: {
      fontFamily: fontFamilies.main,
      fontSize: 12,
      fontWeight: fontWeights.bold,
    },
  },
});
