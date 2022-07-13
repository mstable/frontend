import type { Theme, ThemeOptions } from '@mui/material';

export const getInputLabel = (base: Theme): ThemeOptions => ({
  components: {
    MuiInputLabel: {
      defaultProps: {
        shrink: false,
      },
      styleOverrides: {
        root: {
          position: 'relative',
          transform: 'none',
          transition: 'none',
          zIndex: 'auto',
          pointerEvents: 'auto',
        },
      },
    },
  },
});
