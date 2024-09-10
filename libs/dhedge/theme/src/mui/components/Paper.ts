import type { Theme, ThemeOptions } from '@mui/material';

export const getPaper = (base: Theme): ThemeOptions => ({
  components: {
    MuiPaper: {
      defaultProps: {
        variant: 'elevation',
      },
      styleOverrides: {
        root: {
          backgroundColor: base.palette.background.paper,
        },
      },
    },
  },
});
