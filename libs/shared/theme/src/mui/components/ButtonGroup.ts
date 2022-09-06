import type { Theme, ThemeOptions } from '@mui/material';

export const getButtonGroup = (base: Theme): ThemeOptions => ({
  components: {
    MuiButtonGroup: {
      defaultProps: {
        variant: 'outlined',
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderWidth: 2,
        },
        groupedOutlined: {
          color:
            base.palette.mode === 'light'
              ? base.palette.grey[600]
              : base.palette.grey[500],
          borderColor:
            base.palette.mode === 'light'
              ? base.palette.grey[100]
              : base.palette.grey[800],
          svg: {
            color:
              base.palette.mode === 'light'
                ? base.palette.grey[600]
                : base.palette.grey[500],
          },
          '&:hover': {
            color:
              base.palette.mode === 'light'
                ? base.palette.primary.main
                : base.palette.grey[50],
            backgroundColor:
              base.palette.mode === 'light'
                ? base.palette.grey[100]
                : base.palette.grey[800],
            borderColor:
              base.palette.mode === 'light'
                ? base.palette.grey[100]
                : base.palette.grey[800],
          },
          '&.Mui-selected': {
            color:
              base.palette.mode === 'light'
                ? base.palette.primary.main
                : base.palette.grey[50],
            backgroundColor:
              base.palette.mode === 'light'
                ? base.palette.grey[100]
                : base.palette.grey[800],
            borderColor:
              base.palette.mode === 'light'
                ? base.palette.grey[100]
                : base.palette.grey[800],
          },
          '&.Mui-disabled': {
            color:
              base.palette.mode === 'light'
                ? base.palette.grey[400]
                : base.palette.grey[800],
            backgroundColor:
              base.palette.mode === 'light'
                ? base.palette.grey[300]
                : base.palette.grey[600],
            borderColor:
              base.palette.mode === 'light'
                ? base.palette.grey[300]
                : base.palette.grey[600],
            svg: {
              color:
                base.palette.mode === 'light'
                  ? base.palette.grey[400]
                  : base.palette.grey[800],
            },
          },
        },
      },
    },
  },
});
