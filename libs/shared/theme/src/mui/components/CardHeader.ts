import type { Theme, ThemeOptions } from '@mui/material';

export const getCardHeader = (base: Theme): ThemeOptions => ({
  components: {
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h4',
        },
      },
    },
  },
});
