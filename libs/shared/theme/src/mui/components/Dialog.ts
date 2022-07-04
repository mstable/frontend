import type { Theme, ThemeOptions } from '@mui/material';

export const getDialog = (base: Theme): ThemeOptions => ({
  components: {
    MuiDialog: {
      defaultProps: {
        PaperProps: { elevation: 1 },
      },
      styleOverrides: {
        paper: {
          borderRadius: '16px',
          backgroundColor: base.palette.background.paper,
        },
      },
    },
  },
});
