import type { Theme, ThemeOptions } from '@mui/material';

export const getDivider = (base: Theme): ThemeOptions => ({
  components: {
    MuiDivider: {
      defaultProps: {
        flexItem: true,
      },
      styleOverrides: {
        light: {
          borderColor: base.palette.action.disabledBackground,
        },
        withChildren: (ownerState) => ({
          '::before, ::after': {
            borderColor: ownerState.ownerState.light
              ? base.palette.action.disabledBackground
              : base.palette.divider,
          },
          '.MuiTypography-root': {
            padding: base.spacing(0.5),
            borderRadius: '4px',
            backgroundColor: base.palette.divider,
            color: base.palette.text.secondary,
            minWidth: 120,
            ...(ownerState.ownerState.light && {
              backgroundColor: base.palette.action.disabledBackground,
              color: base.palette.text.disabled,
            }),
          },
        }),
      },
    },
  },
});
