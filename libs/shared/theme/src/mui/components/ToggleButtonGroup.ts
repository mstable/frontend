import type { Theme, ThemeOptions } from '@mui/material';

export const getToggleButtonGroup = (base: Theme): ThemeOptions => ({
  components: {
    MuiToggleButtonGroup: {
      defaultProps: {
        color: 'standard',
      },
      styleOverrides: {
        root: {
          '.MuiToggleButton-standard': {
            color: base.palette.text.primary,
            backgroundColor: base.palette.grey[100],
            ':hover': { backgroundColor: base.palette.grey[200] },
            '&.Mui-selected': {
              backgroundColor: base.palette.grey[300],
              ':hover': { backgroundColor: base.palette.grey[200] },
            },
          },
          '.MuiToggleButton-secondary': {
            color: base.palette.grey[50],
            backgroundColor: base.palette.grey[800],
            ':hover': { backgroundColor: base.palette.grey[700] },
            '&.Mui-selected': {
              color: base.palette.grey[50],
              backgroundColor: base.palette.grey[600],
              ':hover': { backgroundColor: base.palette.grey[700] },
            },
          },
        },
        grouped: {
          '&:first-of-type': {
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
          },
          '&:last-of-type': {
            borderTopRightRadius: '8px',
            borderBottomRightRadius: '8px',
          },
        },
      },
    },
  },
});
