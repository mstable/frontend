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
        root: {
          '.MuiChip-icon': {
            marginLeft: 0,
            marginRight: base.spacing(0.5),
          },
          '.MuiChip-label': {
            paddingLeft: 0,
            paddingRight: 0,
          },
          '&.MuiChip-sizeLarge': {
            padding: base.spacing(1.25),
            fontSize: base.typography.buttonLarge.fontSize,
            fontWeight: base.typography.fontWeightMedium,
            height: base.spacing(4.5),
            borderRadius: base.spacing(2.25),
            '.MuiChip-icon': {
              fontSize: base.typography.buttonLarge.fontSize,
            },
          },
        },
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
              color: base.palette.common.white + ' !important',
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
          height: base.spacing(3.75),
          '.MuiChip-icon': {
            fontSize: base.typography.buttonMedium.fontSize,
          },
        },
        sizeSmall: {
          padding: base.spacing(0.5),
          fontSize: base.typography.buttonSmall.fontSize,
          fontWeight: base.typography.fontWeightMedium,
          height: base.spacing(2.5),
          '.MuiChip-icon': {
            fontSize: base.typography.buttonSmall.fontSize,
          },
        },
      },
    },
  },
});
