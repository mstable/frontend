import { alpha, Box, styled } from '@mui/material';

const getGradient = (orientation: string, steps: string[]) =>
  `linear-gradient(${orientation}, ${steps.join(', ')})`;

export const MstableBackground = styled(Box)(({ theme }) => ({
  background: [
    getGradient('0deg', [
      `${theme.palette.background.default} 0%`,
      `${
        theme.palette.mode === 'light'
          ? `${alpha(theme.palette.background.default, 0.4)} 40%`
          : `${alpha(theme.palette.background.default, 0.3)} 50%`
      }`,
      'transparent 100%',
    ]),
    getGradient('180deg', [
      `${theme.palette.background.default} 0%`,
      `${
        theme.palette.mode === 'light'
          ? `${alpha(theme.palette.background.default, 0.4)} 40%`
          : `${alpha(theme.palette.background.default, 0.3)} 50%`
      }`,
      'transparent 100%',
    ]),
    theme.mixins.gradients.colorCloud,
  ].join(','),
  backgroundSize: '100%',
  backgroundRepeat: 'no-repeat',
}));
