import type { Theme, ThemeOptions } from '@mui/material';

export const getSelect = (base: Theme): ThemeOptions => ({
  components: {
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
        },
      },
      styleOverrides: {
        icon: {
          color: base.palette.text.primary,
        },
      },
    },
  },
});
