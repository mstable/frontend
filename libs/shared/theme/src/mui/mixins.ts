import { alpha } from '@mui/material';

import type { Theme, ThemeOptions } from '@mui/material';

export const getMixinsOptions = (base: Theme): ThemeOptions => ({
  mixins: {
    toolbar: {
      minHeight: 68,
      [`${base.breakpoints.up('xs')} and (orientation: landscape)`]: {
        minHeight: 48,
      },
      [base.breakpoints.up('sm')]: {
        minHeight: 68,
      },
    },
    paddings: {
      page: {
        paddingY: { xs: 1, sm: 2, md: 2.5 },
        paddingX: { xs: 2, sm: 4, md: 6, lg: 8, xl: 12 },
      },
      section: {
        paddingY: { xs: 0.5, sm: 1, md: 1.2 },
        paddingX: { xs: 1, sm: 1.5, md: 2, lg: 3, xl: 4 },
      },
    },
    centered: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    drawerY: {
      sm: {
        width: { xs: '100%', sm: 300 },
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 300 },
        },
      },
      md: {
        width: { xs: '100%', sm: 400 },
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 300 },
        },
      },
      lg: {
        width: { xs: '100%', sm: 560 },
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 300 },
        },
      },
    },
    gradients: {
      colorCloud: `linear-gradient(96.91deg, rgba(157, 149, 255, 0.54) 14.29%, rgba(250, 195, 113, 0.71) 38.84%, rgba(85, 213, 255, 0.53) 69.2%, rgba(251, 136, 215, 0.13) 100%)`,
      numbBottom: [
        `linear-gradient(1deg, ${base.palette.background.default} 0%, ${alpha(
          base.palette.background.default,
          0,
        )} 42%, ${alpha(base.palette.background.default, 0)} 100%)`,
        `linear-gradient(358deg, ${base.palette.background.default} 0%, ${alpha(
          base.palette.background.default,
          0,
        )} 43%, ${alpha(base.palette.background.default, 0)} 100%)`,
      ].join(', '),
      numbTop: [
        `linear-gradient(182deg, ${base.palette.background.default} 0%, ${alpha(
          base.palette.background.default,
          0,
        )} 44%, ${alpha(base.palette.background.default, 0)} 100%)`,
        `linear-gradient(179deg, ${base.palette.background.default} 0%, ${alpha(
          base.palette.background.default,
          0,
        )} 41%, ${alpha(base.palette.background.default, 0)} 100%)`,
      ].join(', '),
    },
  },
});
