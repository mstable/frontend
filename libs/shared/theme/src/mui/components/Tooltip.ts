import type { Theme, ThemeOptions } from '@mui/material';

export const getTooltip = (base: Theme): ThemeOptions => ({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: base.palette.grey[100],
          color: base.palette.grey[600],
          padding: base.spacing(1, 1.5),
          fontSize: '12px',
          borderRadius: '6px',
        },
        arrow: {
          color: base.palette.grey[100],
        },
      },
    },
  },
});
