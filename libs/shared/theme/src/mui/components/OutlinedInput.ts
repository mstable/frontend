import type { Theme, ThemeOptions } from '@mui/material';

export const getOutlinedInput = (base: Theme): ThemeOptions => ({
  components: {
    MuiOutlinedInput: {
      defaultProps: {
        color: 'primary',
      },
      styleOverrides: {
        root: {
          padding: 0,

          '.MuiSelect-select': {
            minWidth: 80,
          },

          '.MuiInputAdornment-root': {
            position: 'absolute',
          },

          '.MuiInputAdornment-positionStart': {
            left: base.spacing(2),
          },

          '.MuiInputAdornment-positionEnd': {
            right: base.spacing(2),
          },

          '&.MuiInputBase-multiline': {
            alignItems: 'flex-start',

            '.MuiInputAdornment-root': {
              height: 'inherit',
              maxHeight: 'inherit',
              paddingTop: base.spacing(1.5),
            },
          },

          '.MuiOutlinedInput-input::placeholder': {
            ...base.typography.placeholder,
            opacity: 1,
          },

          '&.Mui-disabled': {
            backgroundColor: base.palette.action.disabledBackground,
            color: base.palette.text.disabled,

            '.MuiOutlinedInput-input::placeholder': {
              color: base.palette.text.disabled,
            },

            '.MuiInputAdornment-root': {
              color: base.palette.text.disabled,

              '.MuiSvgIcon-root': {
                color: base.palette.text.disabled,
              },
            },

            '.MuiOutlinedInput-notchedOutline': {
              borderColor: base.palette.action.disabledBackground,
            },
          },
        },

        notchedOutline: {
          borderColor: base.palette.divider,
          top: 0,

          legend: {
            display: 'none',
          },
        },

        sizeSmall: {
          '.MuiInputAdornment-positionStart': {
            left: base.spacing(1.5),
          },

          '.MuiInputAdornment-positionEnd': {
            right: base.spacing(1.5),
          },

          '&.MuiInputBase-multiline': {
            '.MuiInputAdornment-root': {
              paddingTop: base.spacing(0.75),
            },
          },
        },
      },
    },
  },
});
