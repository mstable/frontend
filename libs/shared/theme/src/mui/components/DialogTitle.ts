import type { Theme, ThemeOptions } from '@mui/material';

export const getDialogTitle = (base: Theme): ThemeOptions => ({
  components: {
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: base.spacing(4, 4, 2),
          ...base.typography.h3,
          textTransform: 'none',
        },
      },
    },
  },
});
