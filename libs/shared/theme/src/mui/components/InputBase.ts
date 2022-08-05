import type { Theme, ThemeOptions } from '@mui/material';

export const getInputBase = (base: Theme): ThemeOptions => ({
  components: {
    MuiInputBase: {
      defaultProps: {
        size: 'medium',
        maxRows: 12,
      },
      styleOverrides: {
        root: {
          ...base.typography.body1,
          '&:not(.MuiInputBase-multiline):not(.MuiAutocomplete-inputRoot)': {
            height: 48,
          },

          '.placeholder': {
            ...base.typography.placeholder,
          },

          '&.Mui-error': { color: base.palette.error.main },

          '.MuiInputBase-input': {
            height: '100%',
            boxSizing: 'border-box',
          },

          '.MuiInputBase-inputMultiline': {
            paddingRight: base.spacing(1.5),
            paddingLeft: base.spacing(2),
          },

          '.MuiSelect-select': {
            paddingLeft: base.spacing(2),
            paddingRight: `${base.spacing(5)} !important`,
          },

          '&.MuiInputBase-adornedStart': {
            '.MuiOutlinedInput-input:not(.MuiSelect-select):not(.MuiAutocomplete-input)':
              {
                paddingLeft: base.spacing(6),
              },

            '.MuiSelect-select': {
              paddingLeft: base.spacing(6),
            },
          },

          '&.MuiInputBase-adornedEnd': {
            '.MuiOutlinedInput-input:not(.MuiSelect-select):not(.MuiAutocomplete-input)':
              {
                paddingRight: base.spacing(6),
              },
          },

          '.MuiSelect-icon': {
            right: base.spacing(1.5),
          },
        },

        sizeSmall: {
          fontSize: 14,
          lineHeight: 14,
          '&:not(.MuiInputBase-multiline):not(.MuiAutocomplete-inputRoot)': {
            height: 32,
          },

          '.MuiInputBase-inputMultiline': {
            paddingRight: base.spacing(1.5),
            paddingLeft: base.spacing(1.5),
          },

          '.MuiSelect-select': {
            paddingLeft: base.spacing(1.5),
            paddingRight: `${base.spacing(4.5)} !important`,
          },

          '&.MuiInputBase-adornedStart': {
            '.MuiOutlinedInput-input:not(.MuiSelect-select):not(.MuiAutocomplete-input)':
              {
                paddingLeft: base.spacing(4.5),
              },

            '.MuiSelect-select': {
              paddingLeft: base.spacing(4.5),
            },
          },

          '&.MuiInputBase-adornedEnd': {
            '.MuiOutlinedInput-input:not(.MuiSelect-select):not(.MuiAutocomplete-input)':
              {
                paddingRight: base.spacing(4.5),
              },
          },

          '.MuiSelect-icon': {
            right: base.spacing(1),
          },
        },
      },
    },
  },
});
