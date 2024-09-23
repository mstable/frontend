import type { Theme, ThemeOptions } from '@mui/material';

export const getFormControl = (base: Theme): ThemeOptions => ({
  components: {
    MuiFormControl: {
      defaultProps: {
        margin: 'normal',
        size: 'medium',
      },
      styleOverrides: {
        root: {
          margin: 0,
        },

        marginNormal: {
          '.MuiFormLabel-root': {
            '& + .MuiFormControlLabel-root, & + .MuiFormGroup-root': {
              marginTop: base.spacing(2),
            },
          },

          '.MuiInputLabel-root': {
            '& + .MuiInputBase-root': {
              marginTop: base.spacing(1),
            },
          },

          '.MuiFormControlLabel-root': {
            '& + .MuiFormControlLabel-root': {
              marginTop: base.spacing(2),
            },

            '& + .MuiFormHelperText-root': {
              marginTop: base.spacing(1),
            },
          },

          '.MuiFormGroup-root': {
            '& + .MuiFormHelperText-root': {
              marginTop: base.spacing(1),
            },
          },

          '.MuiInputBase-root': {
            '& + .MuiFormHelperText-root': {
              marginTop: base.spacing(1),
            },
          },
        },

        marginDense: {
          '.MuiFormLabel-root': {
            '& + .MuiFormControlLabel-root, & + .MuiFormGroup-root': {
              marginTop: base.spacing(1.5),
            },
          },

          '.MuiInputLabel-root': {
            '& + .MuiInputBase-root': {
              marginTop: base.spacing(0.5),
            },
          },

          '.MuiFormControlLabel-root': {
            '& + .MuiFormControlLabel-root': {
              marginTop: base.spacing(1.5),
            },

            '& + .MuiFormHelperText-root': {
              marginTop: base.spacing(1),
            },
          },

          '.MuiFormGroup-root': {
            '& + .MuiFormHelperText-root': {
              marginTop: base.spacing(1),
            },
          },

          '.MuiInputBase-root': {
            '& + .MuiFormHelperText-root': {
              marginTop: base.spacing(0.5),
            },
          },
        },
      },
    },
  },
});
