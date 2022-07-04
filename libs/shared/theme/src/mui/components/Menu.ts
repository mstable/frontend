import type { Theme, ThemeOptions } from '@mui/material';

export const getMenu = (base: Theme): ThemeOptions => ({
  components: {
    MuiMenu: {
      defaultProps: {
        elevation: 1,
        MenuListProps: { disablePadding: false },
      },
      styleOverrides: {
        paper: {
          padding: 0,
          backgroundColor: base.palette.background.paper,
        },
      },
    },
  },
});
