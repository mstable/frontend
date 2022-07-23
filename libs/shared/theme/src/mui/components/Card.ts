import type { Theme, ThemeOptions } from '@mui/material';

export const getCard = (base: Theme): ThemeOptions => ({
  components: {
    MuiCard: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          boxShadow: base.shadows[1],
        },
      },
    },
  },
});
