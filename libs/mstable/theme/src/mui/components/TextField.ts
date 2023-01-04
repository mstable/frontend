import type { Theme, ThemeOptions } from '@mui/material';

export const getTextField = (base: Theme): ThemeOptions => ({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: 0,
        },
      },
    },
  },
});
