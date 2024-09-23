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
            backgroundColor:
              base.palette.mode === 'light'
                ? base.palette.grey[200]
                : base.palette.grey[700],
            borderColor:
              base.palette.mode === 'light'
                ? base.palette.grey[100]
                : base.palette.grey[800],
          },
          '&.Mui-selected': {
            backgroundColor:
              base.palette.mode === 'light'
                ? base.palette.grey[100]
                : base.palette.grey[800],
            borderColor:
              base.palette.mode === 'light'
                ? base.palette.grey[100]
                : base.palette.grey[800],
            '&:hover': {
              backgroundColor:
                base.palette.mode === 'light'
                  ? base.palette.grey[200]
                  : base.palette.grey[700],
              borderColor:
                base.palette.mode === 'light'
                  ? base.palette.grey[100]
                  : base.palette.grey[800],
            },
          },
          '&.Mui-disabled': {
            color: base.palette.text.disabled,
            backgroundColor: base.palette.action.disabledBackground,
            borderColor: base.palette.action.disabledBackground,
            svg: {
              color: base.palette.text.disabled,
            },
          },
        },
      },
    },
  },
});
