import type { Theme, ThemeOptions } from '@mui/material';

export const getToggleButton = (base: Theme): ThemeOptions => ({
  components: {
    MuiToggleButton: {
      styleOverrides: {
        sizeSmall: {
          ...base.typography.buttonSmall,
          padding: '3px',
          svg: {
            width: '14px',
            height: '14px',
          },
        },
        sizeMedium: {
          ...base.typography.buttonMedium,
          padding: '5px',
          svg: {
            width: '14px',
            height: '14px',
          },
        },
        sizeLarge: {
          ...base.typography.buttonLarge,
          padding: '7px',
          svg: {
            width: '16px',
            height: '16px',
          },
        },
      },
    },
  },
});
