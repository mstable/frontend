import type { Theme, ThemeOptions } from '@mui/material';

export const getDialogActions = (base: Theme): ThemeOptions => ({
  components: {
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: base.spacing(0, 4, 4),
          [base.breakpoints.down('md')]: {
            padding: base.spacing(0, 2, 2, 2),
          },
        },
      },
    },
  },
});
