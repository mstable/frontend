import { alpha, Box, styled } from '@mui/material';

const getGradient = (orientation: string, steps: string[]) =>
  `linear-gradient(${orientation}, ${steps.join(', ')})`;

const a = { light: 0.2, dark: 0.35 };

export const MstableBackground = styled(Box)(({ theme }) => ({
  background: [
    getGradient('2deg', [
      `${theme.palette.background.default} 0%`,
      `${
        theme.palette.mode === 'light'
          ? `${alpha(theme.palette.background.default, a.light)} 20%`
          : `${alpha(theme.palette.background.default, a.dark)} 30%`
      }`,
      'transparent 100%',
    ]),
    getGradient('358deg', [
      `${theme.palette.background.default} 0%`,
      `${
        theme.palette.mode === 'light'
          ? `${alpha(theme.palette.background.default, a.light)} 20%`
          : `${alpha(theme.palette.background.default, a.dark)} 25%`
      }`,
      'transparent 100%',
    ]),
    getGradient('178deg', [
      `${theme.palette.background.default} 0%`,
      `${
        theme.palette.mode === 'light'
          ? `${alpha(theme.palette.background.default, a.light)} 20%`
          : `${alpha(theme.palette.background.default, a.dark)} 20%`
      }`,
      'transparent 100%',
    ]),
    getGradient('182deg', [
      `${theme.palette.background.default} 0%`,
      `${
        theme.palette.mode === 'light'
          ? `${alpha(theme.palette.background.default, a.light)} 20%`
          : `${alpha(theme.palette.background.default, a.dark)} 30%`
      }`,
      'transparent 100%',
    ]),
    theme.mixins.gradients.colorCloud,
  ].join(','),
  backgroundSize: '100%',
  backgroundRepeat: 'no-repeat',
}));
