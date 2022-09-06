import type { Theme, ThemeOptions } from '@mui/material';

export const getTab = (base: Theme): ThemeOptions => ({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
        },
      },
    },
  },
});
