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
          color: base.palette.text.primary,
          backgroundColor:
            base.palette.mode === 'light'
              ? base.palette.grey[100]
              : base.palette.grey[800],
          ':hover': {
            backgroundColor:
              base.palette.mode === 'light'
                ? base.palette.grey[200]
                : base.palette.grey[700],
          },
          svg: {
            color: base.palette.text.primary,
          },
          '&.Mui-disabled': {
            color: base.palette.text.disabled,
            backgroundColor: base.palette.action.disabledBackground,
            svg: {
              color: base.palette.text.disabled,
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
