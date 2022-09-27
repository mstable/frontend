import type { Theme, ThemeOptions } from '@mui/material';

export const getSelect = (base: Theme): ThemeOptions => ({
  components: {
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
        },
      },
      styleOverrides: {
        icon: {
          color: base.palette.text.primary,
        },
        filled: {
          height: 'inherit',
          color: base.palette.text.primary,
          backgroundColor:
            base.palette.mode === 'light'
              ? base.palette.grey[100]
              : base.palette.grey[800],
          ':hover': {
            backgroundColor:
              base.palette.mode === 'light'
                ? base.palette.grey[200]
                : base.palette.grey[700],
          },
          svg: {
            color: base.palette.text.primary,
          },
          '&.Mui-disabled': {
            color: base.palette.text.disabled,
            backgroundColor: base.palette.action.disabledBackground,
            svg: {
              color: base.palette.text.disabled,
            },
          },
          '&.MuiInputBase-inputSizeSmall': {
            ...base.typography.buttonSmall,
            padding: base.spacing(1, 1.5),
            borderRadius: '8px',
            minHeight: 34,
            minWidth: 34,
            lineHeight: 1.625,
          },
          '&.MuiInputBase-inputSizeMedium': {
            ...base.typography.buttonMedium,
            padding: base.spacing(1.5, 2),
            borderRadius: '10px',
            minHeight: 40,
            minWidth: 40,
            lineHeight: 2,
          },
        },
      },
    },
  },
});
