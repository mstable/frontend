import { alpha, Box, styled } from '@mui/material';

const getGradient = (orientation: string, steps: string[]) =>
  `linear-gradient(${orientation}, ${steps.join(', ')})`;

const a = { light: 0.2, dark: 0 };

export const MstableBackground = styled(Box)(({ theme }) => ({
  background: [
    getGradient('2deg', [
      `${theme.palette.background.default} 0%`,
      `${
        theme.palette.mode === 'light'
          ? `${alpha(theme.palette.background.default, a.light)} 30%`
          : `${alpha(theme.palette.background.default, a.dark)} 60%`
      }`,
      'transparent 100%',
    ]),
    getGradient('358deg', [
      `${theme.palette.background.default} 0%`,
      `${
        theme.palette.mode === 'light'
          ? `${alpha(theme.palette.background.default, a.light)} 30%`
          : `${alpha(theme.palette.background.default, a.dark)} 60%`
      }`,
      'transparent 100%',
    ]),
    getGradient('180deg', [
      `${theme.palette.background.default} 0%`,
      `${
        theme.palette.mode === 'light'
          ? `${alpha(theme.palette.background.default, a.light)} 40%`
          : `${alpha(theme.palette.background.default, a.dark)} 60%`
      }`,
      'transparent 100%',
    ]),
    getGradient('184deg', [
      `${theme.palette.background.default} 0%`,
      `${
        theme.palette.mode === 'light'
          ? `${alpha(theme.palette.background.default, a.light)} 60%`
          : `${alpha(theme.palette.background.default, a.dark)} 60%`
      }`,
      'transparent 100%',
    ]),
    theme.mixins.gradients.colorCloud,
  ].join(','),
  [theme.breakpoints.down('md')]: {
    backgroundSize: '100% 440px',
  },
  [theme.breakpoints.up('md')]: {
    backgroundSize: '100% 360px',
  },
  backgroundRepeat: 'no-repeat',
}));
