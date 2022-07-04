import type { Theme, ThemeOptions } from '@mui/material';

export const getDialogContent = (base: Theme): ThemeOptions => ({
  components: {
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: base.spacing(0, 4, 4),
        },
      },
    },
  },
});
