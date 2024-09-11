import '@fontsource/vazir'; // tw-font-normal (400)
import '@fontsource/vazir/500.css'; // tw-font-medium
import '@fontsource/vazir/700.css'; // tw-font-bold
import '@fontsource/inter'; // tw-font-normal (400)
import '@fontsource/inter/500.css'; // tw-font-medium
import '@fontsource/inter/600.css'; // tw-font-semibold
import '@fontsource/inter/700.css'; // tw-font-bold

import {
  fontFamilies,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
} from '../constants';

import type { ThemeOptions } from '@mui/material';

export const getTypographyOptions = (base?: ThemeOptions): ThemeOptions => ({
  typography: {
    fontFamily: fontFamilies.main,

    fontWeightLight: fontWeights.regular,
    fontWeightRegular: fontWeights.medium,
    fontWeightMedium: fontWeights.semibold,
    fontWeightBold: fontWeights.bold,

    fontSizes,
    fontFamilies,
    lineHeights,
    letterSpacings,

    h1: {
      fontFamily: fontFamilies.heading,
      fontSize: 40,
      lineHeight: 1.25,
      fontWeight: fontWeights.extrabold,
    },
    h2: {
      fontFamily: fontFamilies.heading,
      fontSize: 32,
      lineHeight: 1.25,
      fontWeight: fontWeights.extrabold,
    },
    h3: {
      fontFamily: fontFamilies.heading,
      fontSize: 28,
      lineHeight: 1.25,
      fontWeight: fontWeights.extrabold,
    },
    h4: {
      fontFamily: fontFamilies.heading,
      fontSize: 24,
      lineHeight: 1.25,
      fontWeight: fontWeights.bold,
    },
    h5: {
      fontFamily: fontFamilies.heading,
      fontSize: 18,
      lineHeight: 1.25,
      fontWeight: fontWeights.bold,
    },
    subtitle1: {
      fontFamily: fontFamilies.heading,
      fontSize: 14,
      lineHeight: 1.2,
      fontWeight: fontWeights.medium,
    },
    subtitle2: {
      fontFamily: fontFamilies.heading,
      fontSize: 12,
      lineHeight: 1.2,
      fontWeight: fontWeights.medium,
      color:
        base.palette.mode === 'light'
          ? base.palette.grey[600]
          : base.palette.grey[500],
    },
    body1: {
      fontFamily: fontFamilies.body,
      fontSize: 16,
      lineHeight: 1.625,
      fontWeight: fontWeights.medium,
    },
    body2: {
      fontFamily: fontFamilies.body,
      fontSize: 14,
      lineHeight: 1.625,
      fontWeight: fontWeights.medium,
    },
    buttonSmall: {
      fontFamily: fontFamilies.body,
      fontSize: 12,
      lineHeight: 1,
      textTransform: 'none',
      fontWeight: fontWeights.bold,
    },
    button: {
      fontFamily: fontFamilies.body,
      fontSize: 14,
      lineHeight: 1,
      textTransform: 'none',
      fontWeight: fontWeights.bold,
    },
    buttonMedium: {
      fontFamily: fontFamilies.body,
      fontSize: 14,
      lineHeight: 1,
      textTransform: 'none',
      fontWeight: fontWeights.bold,
    },
    buttonLarge: {
      fontFamily: fontFamilies.body,
      fontSize: 16,
      lineHeight: 1,
      textTransform: 'none',
      fontWeight: fontWeights.bold,
    },
    label1: {
      fontFamily: fontFamilies.body,
      fontSize: 14,
      lineHeight: 1.25,
      fontWeight: fontWeights.bold,
      textTransform: 'uppercase',
      letterSpacing: '5%',
    },
    label2: {
      fontFamily: fontFamilies.body,
      fontSize: 14,
      lineHeight: 1.25,
      fontWeight: fontWeights.bold,
      letterSpacing: '5%',
    },
    placeholder: {
      fontFamily: fontFamilies.body,
      fontSize: 14,
      lineHeight: 1.25,
      fontWeight: fontWeights.regular,
    },
    hint: {
      fontFamily: fontFamilies.body,
      fontSize: 12,
      lineHeight: 1.25,
      fontWeight: fontWeights.semibold,
    },
    value1: {
      fontFamily: fontFamilies.body,
      fontSize: 28,
      lineHeight: 1.25,
      letterSpacing: '-4%',
      fontWeight: fontWeights.semibold,
    },
    value2: {
      fontFamily: fontFamilies.body,
      fontSize: 24,
      lineHeight: 1.25,
      letterSpacing: '-4%',
      fontWeight: fontWeights.semibold,
    },
    value3: {
      fontFamily: fontFamilies.body,
      fontSize: 18,
      lineHeight: 1.25,
      letterSpacing: '-4%',
      fontWeight: fontWeights.semibold,
    },
    value4: {
      fontFamily: fontFamilies.body,
      fontSize: 16,
      lineHeight: 1.25,
      letterSpacing: '-4%',
      fontWeight: fontWeights.semibold,
    },
    value5: {
      fontFamily: fontFamilies.body,
      fontSize: 14,
      lineHeight: 1.25,
      letterSpacing: '-4%',
      fontWeight: fontWeights.semibold,
    },
    value6: {
      fontFamily: fontFamilies.body,
      fontSize: 12,
      lineHeight: 1.25,
      letterSpacing: '-4%',
      fontWeight: fontWeights.semibold,
    },
  },
});
