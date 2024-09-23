import type { Theme, ThemeOptions } from '@mui/material';

export const getButtonBase = (base: Theme): ThemeOptions => ({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
  },
});
