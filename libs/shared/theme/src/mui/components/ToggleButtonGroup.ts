import { toggleButtonClasses } from '@mui/material';

import type { Theme, ThemeOptions } from '@mui/material';

export const getToggleButtonGroup = (base: Theme): ThemeOptions => ({
  components: {
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          [`.${toggleButtonClasses.standard}`]: {
            color: base.palette.text.primary,
            borderColor: base.palette.grey[100],
            ':hover': { backgroundColor: base.palette.grey[200] },
            '&.Mui-selected': {
              backgroundColor: base.palette.grey[100],
              ':hover': { backgroundColor: base.palette.grey[200] },
            },
          },
          [`.${toggleButtonClasses.secondary}`]: {
            color: base.palette.grey[50],
            borderColor: base.palette.grey[800],
            backgroundColor: base.palette.grey[900],
            ':hover': { backgroundColor: base.palette.grey[700] },
            '&.Mui-selected': {
              color: base.palette.grey[50],
              backgroundColor: base.palette.grey[800],
              ':hover': { backgroundColor: base.palette.grey[700] },
            },
          },
          [`.${toggleButtonClasses.sizeSmall}`]: {
            '&:first-of-type': {
              borderTopLeftRadius: '8px',
              borderBottomLeftRadius: '8px',
            },
            '&:last-of-type': {
              borderTopRightRadius: '8px',
              borderBottomRightRadius: '8px',
            },
          },
          [`.${toggleButtonClasses.sizeMedium}`]: {
            '&:first-of-type': {
              borderTopLeftRadius: '10px',
              borderBottomLeftRadius: '10px',
            },
            '&:last-of-type': {
              borderTopRightRadius: '10px',
              borderBottomRightRadius: '10px',
            },
          },
          [`.${toggleButtonClasses.sizeLarge}`]: {
            '&:first-of-type': {
              borderTopLeftRadius: '12px',
              borderBottomLeftRadius: '12px',
            },
            '&:last-of-type': {
              borderTopRightRadius: '12px',
              borderBottomRightRadius: '12px',
            },
          },
        },
      },
    },
  },
});
