import type { Theme, ThemeOptions } from '@mui/material';

export const getFormHelperText = (base: Theme): ThemeOptions => ({
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          ...base.typography.body2,
          color: base.palette.text.secondary,
          marginLeft: 0,
          marginRight: 0,

          '&.Mui-error': {
            color: base.palette.error.main,
          },
        },
      },
    },
  },
});
