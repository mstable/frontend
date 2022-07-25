import type { Theme, ThemeOptions } from '@mui/material';

export const getChip = (base: Theme): ThemeOptions => ({
  components: {
    MuiChip: {
      defaultProps: {
        variant: 'filled',
        color: 'primary',
        size: 'small',
      },
      styleOverrides: {
        colorPrimary: {
          background:
            base.palette.mode === 'light'
              ? base.palette.grey[300]
              : base.palette.grey[600],
          color: base.palette.secondary.main,
          '&.MuiChip-clickable': {
            ':hover': {
              color: base.palette.common.white,
              backgroundColor:
                base.palette.mode === 'light'
                  ? base.palette.grey[500]
                  : base.palette.grey[800],
            },
          },
          '&.Mui-active': {
            borderColor: base.palette.primary.main,
            borderWidth: 1,
            borderStyle: 'solid',
          },
        },
        colorSecondary: {
          background: base.palette.primary.main,
          color: base.palette.common.white,
          '&.MuiChip-clickable': {
            ':hover': {
              backgroundColor: base.palette.primary.dark,
            },
          },
          '&.Mui-active': {
            borderColor: base.palette.primary.main,
            borderWidth: 1,
            borderStyle: 'solid',
            backgroundColor: 'rgba(47, 95, 238, 0.2)',
            color: base.palette.primary.main,
          },
        },
        outlined: {
          borderColor:
            base.palette.mode === 'light'
              ? base.palette.grey[300]
              : base.palette.grey[600],
          borderWidth: 1,
          borderStyle: 'solid',
          background: 'transparent',
          ':hover': {
            background:
              (base.palette.mode === 'light'
                ? base.palette.grey[300]
                : base.palette.grey[600]) + ' !important',
            color: base.palette.secondary.main + ' !important',
          },
        },
        sizeMedium: {
          padding: base.spacing(1),
          fontSize: base.typography.buttonMedium.fontSize,
          fontWeight: base.typography.fontWeightMedium,
        },
        sizeSmall: {
          padding: base.spacing(0.5),
          fontSize: base.typography.buttonSmall.fontSize,
          fontWeight: base.typography.fontWeightMedium,
        },
      },
    },
  },
});
