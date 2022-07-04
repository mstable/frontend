import { alpha } from '@mui/material';

import type { Theme, ThemeOptions } from '@mui/material';

export const getButton = (base: Theme): ThemeOptions => ({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'contained',
        color: 'primary',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },

        containedPrimary: {
          backgroundSize: '200% 100%',
          backgroundImage: `linear-gradient(280deg, ${alpha(
            base.palette.primary.dark,
            0.8,
          )} 0%, ${alpha(base.palette.primary.main, 0.5)} 51%, ${alpha(
            base.palette.primary.light,
            0.9,
          )} 100%)`,
          transition: 'all .2s ease-in-out',
          ':hover': {
            backgroundPosition: '100% 100%',
          },
        },

        containedSecondary: {
          backgroundColor: base.palette.grey[300],
          svg: {
            color: base.palette.secondary.contrastText,
          },
        },

        textSecondary: {
          color: base.palette.text.secondary,
          svg: {
            color: base.palette.text.secondary,
          },
        },

        outlinedSecondary: {
          borderColor: base.palette.text.secondary,
          color: base.palette.text.secondary,
          svg: {
            color: base.palette.text.secondary,
          },
        },

        sizeSmall: {
          fontSize: 12,
          lineHeight: '12px',
          padding: base.spacing(1.5, 2),
          borderRadius: 8,
        },
        textSizeSmall: {
          padding: base.spacing(0.75, 0.5),
        },
        sizeMedium: {
          padding: base.spacing(2, 2.5),
          borderRadius: 12,
        },
        textSizeMedium: {
          padding: base.spacing(2),
        },
        sizeLarge: {
          fontSize: 21,
          lineHeight: '21px',
          padding: base.spacing(2.5, 3),
          borderRadius: 16,
        },
        textSizeLarge: {
          padding: base.spacing(1, 1),
        },
      },
    },
  },
});
