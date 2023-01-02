import type { Theme, ThemeOptions } from '@mui/material';

export const getTableCell = (base: Theme): ThemeOptions => ({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${base.palette.divider}`,
        },
      },
    },
  },
});
