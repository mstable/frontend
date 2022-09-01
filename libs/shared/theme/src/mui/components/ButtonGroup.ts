import type { Theme, ThemeOptions } from '@mui/material';

export const getButtonGroup = (base: Theme): ThemeOptions => ({
  components: {
    MuiButtonGroup: {
      defaultProps: {
        variant: 'contained',
        disableElevation: true,
        disableFocusRipple: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderWidth: 2,
        },
        groupedOutlined: {
          '&.Mui-disabled': {
            color: base.palette.action.disabled,
            backgroundColor: base.palette.action.disabledBackground,
            svg: {
              color: base.palette.action.disabled,
            },
          },
          '&:not(:last-of-type)': {
            borderColor: base.palette.divider,
          },
        },
        groupedContainedSecondary: {
          backgroundColor: base.palette.secondary.light,
          color: base.palette.secondary.contrastText,
          '&:hover': {
            backgroundColor: base.palette.secondary.main,
          },
          svg: {
            color: base.palette.secondary.contrastText,
          },
        },
      },
    },
  },
});
