import type { Theme, ThemeOptions } from '@mui/material';

export const getDivider = (base: Theme): ThemeOptions => ({
  components: {
    MuiDivider: {
      defaultProps: {
        flexItem: true,
      },
    },
  },
});
