import type { Theme, ThemeOptions } from '@mui/material';

export const getTooltip = (base: Theme): ThemeOptions => ({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor:
            base.palette.mode === 'light'
              ? base.palette.grey[200]
              : base.palette.grey[800],
          color:
            base.palette.mode === 'light'
              ? base.palette.grey[600]
              : base.palette.grey[500],
          padding: base.spacing(1, 1.5),
          fontSize: '12px',
          borderRadius: '6px',
        },
        arrow: {
          color:
            base.palette.mode === 'light'
              ? base.palette.grey[200]
              : base.palette.grey[800],
        },
      },
    },
  },
});
