import type { Theme, ThemeOptions } from '@mui/material';

export const getMenuItem = (base: Theme): ThemeOptions => ({
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          padding: base.spacing(1.25, 0.75, 1.25, 0.75),
          minHeight: '48px',
          ...base.typography.hint,
          '&.Mui-Selected': {
            backgroundColor: base.palette.grey[100],
          },
          '&:hover': {
            backgroundColor: base.palette.grey[200],
          },
          '.MuiAvatar-root': {
            height: '40px',
            width: '40px',
          },
          // Repeating ListItemIcon styles to get around an MUI specificity bug
          '.MuiListItemIcon-root': {
            minWidth: '40px',
            justifyContent: 'center',
            color: base.palette.primary.main,

            '&:first-of-type': {
              minWidth: 0,
              marginRight: base.spacing(1),
            },
          },
        },
        dense: {
          minHeight: '36px',
          padding: base.spacing(0, 0.5, 0, 1.5),

          '.MuiAvatar-root': {
            height: '24px',
            width: '24px',
          },
          '.MuiListItemText-root': {
            padding: base.spacing(1, 1, 1, 0),
          },
          '.MuiListItemText-multiline': {
            padding: base.spacing(0.5, 1, 0.5, 0),
          },
          '.MuiListItemIcon-root:last-of-type': {
            '.MuiSvgIcon-root': {
              height: '16px',
              width: '16px',
            },
          },
        },
        divider: {
          '.MuiListItemIcon-root:first-of-type': {
            minWidth: 0,
          },
        },
      },
    },
  },
});
