import type { Theme, ThemeOptions } from '@mui/material';

export const getAvatar = (base: Theme): ThemeOptions => ({
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 24,
          height: 24,
          fontSize: 18,
          '.MuiSvgIcon-root': {
            width: 16,
            height: 16,
            color: base.palette.text.primary,
          },
        },
        colorDefault: {
          color: base.palette.text.primary,
          backgroundColor:
            base.palette.mode === 'light'
              ? base.palette.grey[400]
              : base.palette.grey[900],
        },
      },
    },
  },
});
