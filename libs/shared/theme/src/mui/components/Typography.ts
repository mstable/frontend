import type { Theme, ThemeOptions } from '@mui/material';

export const getTypography = (base: Theme): ThemeOptions => ({
  components: {
    MuiTypography: {
      defaultProps: {
        variant: 'body1',
      },
    },
  },
});
