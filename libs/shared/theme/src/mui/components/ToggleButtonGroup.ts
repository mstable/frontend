import { toggleButtonClasses } from '@mui/material';

import type { Theme, ThemeOptions } from '@mui/material';

export const getToggleButtonGroup = (base: Theme): ThemeOptions => ({
  components: {
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          [`.${toggleButtonClasses.standard}`]: {
            color:
              base.palette.mode === 'light'
                ? base.palette.text.primary
                : base.palette.grey[500],
            borderColor:
              base.palette.mode === 'light'
                ? base.palette.grey[100]
                : base.palette.grey[700],
            backgroundColor: 'transparent',
            ':hover': {
              color:
                base.palette.mode === 'light'
                  ? base.palette.grey[600]
                  : base.palette.grey[500],
              backgroundColor:
                base.palette.mode === 'light'
                  ? base.palette.grey[200]
                  : base.palette.grey[700],
            },
            '&.Mui-selected': {
              color: base.palette.primary.main,
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
            },
            '&.Mui-disabled': {
              color:
                base.palette.mode === 'light'
                  ? base.palette.grey[300]
                  : base.palette.grey[700],
              borderColor:
                base.palette.mode === 'light'
                  ? base.palette.grey[300]
                  : base.palette.grey[700],
            },
          },
          [`.${toggleButtonClasses.sizeSmall}`]: {
            '&:first-of-type': {
              borderTopLeftRadius: '4px',
              borderBottomLeftRadius: '4px',
            },
            '&:last-of-type': {
              borderTopRightRadius: '4px',
              borderBottomRightRadius: '4px',
            },
          },
          [`.${toggleButtonClasses.sizeMedium}`]: {
            '&:first-of-type': {
              borderTopLeftRadius: '6px',
              borderBottomLeftRadius: '6px',
            },
            '&:last-of-type': {
              borderTopRightRadius: '6px',
              borderBottomRightRadius: '6px',
            },
          },
          [`.${toggleButtonClasses.sizeLarge}`]: {
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
  },
});
