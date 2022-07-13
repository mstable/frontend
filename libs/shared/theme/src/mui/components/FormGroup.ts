import type { Theme, ThemeOptions } from '@mui/material';

export const getFormGroup = (base: Theme): ThemeOptions => ({
  components: {
    MuiFormGroup: {
      styleOverrides: {
        root: {
          '>*:not(:first-child)': {
            marginTop: base.spacing(0.75),
          },
        },
        row: {
          '>*': {
            marginTop: 0,
          },
        },
      },
    },
  },
});
