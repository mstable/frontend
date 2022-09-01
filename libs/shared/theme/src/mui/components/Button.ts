import { focusFrame } from '../utils';

import type { Theme, ThemeOptions } from '@mui/material';

export const getButton = (base: Theme): ThemeOptions => ({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          '&.Mui-focusVisible::before': focusFrame({
            borderColor: base.palette.primary.light,
          }),
        },

        containedPrimary: {
          backgroundSize: '200% 200%',
          backgroundImage: `linear-gradient(135deg, ${
            base.palette.primary.main
          } 0%, ${base.palette.primary.main} 51%, ${
            base.palette.mode === 'light'
              ? base.palette.primary.dark
              : base.palette.primary.light
          } 100%)`,
          transition: 'all .2s ease',
          ':hover': {
            backgroundPosition: '100% 100%',
          },
          svg: {
            color: base.palette.primary.contrastText,
          },
          '&.Mui-disabled': {
            color: base.palette.grey[400],
            backgroundImage: 'none',
            backgroundColor: base.palette.grey[100],
            svg: {
              color: base.palette.grey[400],
            },
          },
        },

        containedSecondary: {
          backgroundSize: '300% 300%',
          backgroundImage: `linear-gradient(135deg, ${
            base.palette.secondary.main
          } 0%, ${base.palette.secondary.main} 51%, ${
            base.palette.mode === 'light'
              ? base.palette.secondary.light
              : base.palette.secondary.dark
          } 100%)`,
          transition: 'all .2s ease',
          ':hover': {
            backgroundPosition: '100% 100%',
          },
          svg: {
            color: base.palette.secondary.contrastText,
          },
          '&.Mui-disabled': {
            color: base.palette.mode === 'light' ? '#4B4E6E' : '#A7A9CE',
            backgroundColor:
              base.palette.mode === 'light' ? '#8688AC' : '#DEDFFF',
            svg: {
              color: base.palette.mode === 'light' ? '#4B4E6E' : '#A7A9CE',
            },
          },
        },

        text: {
          color: base.palette.text.primary,
          ':hover': {
            color: base.palette.text.secondary,
          },
          svg: {
            color: base.palette.text.primary,
            ':hover': {
              color: base.palette.text.secondary,
            },
          },
        },

        sizeSmall: {
          ...base.typography.buttonSmall,
          padding: base.spacing(1, 1.5),
          borderRadius: '8px',
          minHeight: 34,
          minWidth: 34,
        },
        sizeMedium: {
          ...base.typography.buttonMedium,
          padding: base.spacing(1.5, 2),
          borderRadius: '10px',
          minHeight: 40,
          minWidth: 40,
        },
        sizeLarge: {
          ...base.typography.buttonLarge,
          padding: base.spacing(2, 2.5),
          borderRadius: '12px',
          minHeight: 46,
          minWidth: 46,
        },
      },
    },
  },
});
