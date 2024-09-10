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
          borderRadius: '6px !important',
          marginTop: base.spacing(0.5),
        },
        list: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
  },
});
