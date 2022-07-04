import type { Theme, ThemeOptions } from '@mui/material';

export const getAvatar = (base: Theme): ThemeOptions => ({
  components: {
    MuiAvatar: {
      defaultProps: {
        variant: 'small',
      },
      styleOverrides: {
        root: {
          // Using SVG Icon root class over "fallback" to ensure any icon passed by users is styled appropriately.
          '.MuiSvgIcon-root': {
            color: base.palette.primary.contrastText,
          },
        },
        colorDefault: {
          color: base.palette.primary.contrastText,
          backgroundColor: base.palette.primary.main,
        },
      },
      variants: [
        {
          props: { variant: 'small' },
          style: {
            width: 18,
            height: 18,
            fontFamily: base.typography.fontFamily,
            fontSize: base.typography.fontSizes.xs,
            fontWeight: base.typography.fontWeightMedium,
            textTransform: 'uppercase',
            lineHeight: base.typography.lineHeights.s,
            '.MuiSvgIcon-root': {
              height: 14,
              width: 14,
            },
          },
        },
        {
          props: { variant: 'medium' },
          style: {
            width: 24,
            height: 24,
            fontFamily: base.typography.fontFamily,
            fontSize: base.typography.fontSizes.m,
            fontWeight: base.typography.fontWeightMedium,
            textTransform: 'uppercase',
            lineHeight: base.typography.lineHeights.m,
            '.MuiSvgIcon-root': {
              height: 16,
              width: 16,
            },
          },
        },
        {
          props: { variant: 'large' },
          style: {
            width: 40,
            height: 40,
            fontFamily: base.typography.fontFamily,
            fontSize: base.typography.fontSizes.xl,
            fontWeight: base.typography.fontWeightMedium,
            textTransform: 'uppercase',
            lineHeight: base.typography.lineHeights.l,
            '.MuiSvgIcon-root': {
              height: 24,
              width: 24,
            },
          },
        },
      ],
    },
  },
});
