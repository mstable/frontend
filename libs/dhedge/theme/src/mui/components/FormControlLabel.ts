import type { Theme, ThemeOptions } from '@mui/material';

export const getFormControlLabel = (base: Theme): ThemeOptions => ({
  components: {
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          marginRight: 0,

          '.MuiCheckbox-root, .MuiRadio-root': {
            marginRight: base.spacing(1),
          },
        },
      },
    },
  },
});
