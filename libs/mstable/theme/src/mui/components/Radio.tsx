import type { Theme, ThemeOptions } from '@mui/material';

export const getRadio = (base: Theme): ThemeOptions => ({
  components: {
    MuiRadio: {
      defaultProps: {
        inputProps: {
          'aria-label': 'radio',
        },
      },
      styleOverrides: {
        root: {
          padding: 0,
          '&.Mui-disabled': {
            svg: {
              color: base.palette.action.disabled,
            },
          },
        },
      },
    },
  },
});
