import type { Theme, ThemeOptions } from '@mui/material';

// TODO update icons to match figma
export const getCheckbox = (base: Theme): ThemeOptions => ({
  components: {
    MuiCheckbox: {
      defaultProps: {
        inputProps: {
          'aria-label': 'checkbox',
        },
      },
      styleOverrides: {
        root: {
          padding: '6px',
        },
      },
    },
  },
});
