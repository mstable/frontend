import type { Theme, ThemeOptions } from '@mui/material';

export const getToggleButton = (base: Theme): ThemeOptions => ({
  components: {
    MuiToggleButton: {
      styleOverrides: {
        sizeSmall: {
          ...base.typography.buttonSmall,
        },
        sizeMedium: {
          ...base.typography.buttonMedium,
        },
        sizeLarge: {
          ...base.typography.buttonLarge,
        },
      },
    },
  },
});
