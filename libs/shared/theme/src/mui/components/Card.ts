import type { Theme, ThemeOptions } from '@mui/material';

export const getCard = (base: Theme): ThemeOptions => ({
  components: {
    MuiCard: {
      defaultProps: {
        variant: 'outlined',
        elevation: 1,
      },
    },
  },
});
