import type { Theme, ThemeOptions } from '@mui/material';

export const getAvatarGroup = (base: Theme): ThemeOptions => ({
  components: {
    MuiAvatarGroup: {
      defaultProps: {
        variant: 'small',
      },
      styleOverrides: {
        avatar: {
          border: `1px solid ${base.palette.divider}`,
        },
      },
      variants: [
        {
          props: { variant: 'small' },
          style: {
            '.MuiAvatarGroup-avatar': {
              marginLeft: base.spacing(-0.5),
              borderWidth: '1px',
              letterSpacing: base.typography.letterSpacings.short,
            },
          },
        },
        {
          props: { variant: 'medium' },
          style: {
            '.MuiAvatarGroup-avatar': {
              marginLeft: base.spacing(-0.75),
              letterSpacing: base.typography.letterSpacings.short,
            },
          },
        },
        {
          props: { variant: 'large' },
          style: {
            '.MuiAvatarGroup-avatar': {
              marginLeft: base.spacing(-1),
            },
          },
        },
      ],
    },
  },
});
