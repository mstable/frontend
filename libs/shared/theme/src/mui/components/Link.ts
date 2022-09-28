import type { Theme, ThemeOptions } from '@mui/material';

export const getLink = (base: Theme): ThemeOptions => ({
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
      styleOverrides: {
        root: {
          color: base.palette.info.dark,
          '&:hover': {
            color: base.palette.info.main,
          },
        },
      },
    },
  },
});
