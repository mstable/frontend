import type { Theme, ThemeOptions } from '@mui/material';

export const getAppBar = (base: Theme): ThemeOptions => ({
  components: {
    MuiAppBar: {
      defaultProps: {
        color: 'default',
        elevation: 0,
      },
      styleOverrides: {
        root: {
          '.MuiToolbar-root': {
            minHeight: base.mixins.toolbar.minHeight,
            [base.breakpoints.up('lg')]: {
              padding: base.spacing(1, 4),
            },
            [base.breakpoints.down('lg')]: {
              padding: base.spacing(1, 2.5),
            },
          },
        },
        colorDefault: {
          color: base.palette.text.primary,
          backgroundColor: base.palette.background.default,
        },
      },
    },
  },
});
