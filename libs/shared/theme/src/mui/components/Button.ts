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
          padding: base.spacing(1.75, 1.5),
          borderRadius: '8px',
        },
        sizeMedium: {
          ...base.typography.buttonMedium,
          padding: base.spacing(2, 1.75),
          borderRadius: '10px',
        },
        sizeLarge: {
          ...base.typography.buttonLarge,
          padding: base.spacing(2.25, 2),
          borderRadius: '12px',
        },
      },
    },
  },
});
