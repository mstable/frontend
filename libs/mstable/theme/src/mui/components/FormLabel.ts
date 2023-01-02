import type { Theme, ThemeOptions } from '@mui/material';

export const getFormLabel = (base: Theme): ThemeOptions => ({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          ...base.typography.label2,
          color: base.palette.text.primary,

          '&.Mui-disabled': {
            color: base.palette.text.disabled,
          },
        },
      },
    },
  },
});
