import type { Theme, ThemeOptions } from '@mui/material';

export const getToggleButton = (base: Theme): ThemeOptions => ({
  components: {
    MuiToggleButton: {
      styleOverrides: {
        sizeSmall: {
          ...base.typography.buttonSmall,
          padding: base.spacing('11px', '7px'),
        },
        sizeMedium: {
          ...base.typography.buttonMedium,
          padding: base.spacing('13px', '9px'),
        },
        sizeLarge: {
          ...base.typography.buttonLarge,
          padding: base.spacing('15px', '11px'),
        },
      },
    },
  },
});
