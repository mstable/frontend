import type { Theme, ThemeOptions } from '@mui/material';

// TODO update icons to match figma
export const getCard = (base: Theme): ThemeOptions => ({
  components: {
    MuiCard: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          px: 0,
          py: base.spacing(2),
        },
      },
    },
  },
});
