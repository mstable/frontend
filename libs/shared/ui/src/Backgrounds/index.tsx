import { alpha, Box, styled } from '@mui/material';

const getGradient = (orientation: string, steps: string[]) =>
  `linear-gradient(${orientation}, ${steps.join(', ')})`;

export const MstableBackground = styled(Box)(({ theme }) => ({
  background: [
    getGradient('0deg', [
      `${theme.palette.background.default} 0%`,
      `${alpha(theme.palette.background.default, 0.4)} 25%`,
      'transparent 100%',
    ]),
    getGradient('180deg', [
      `${theme.palette.background.default} 0%`,
      `${alpha(theme.palette.background.default, 0.4)} 25%`,
      'transparent 100%',
    ]),
    theme.mixins.gradients.colorCloud,
  ].join(','),
  backgroundSize: '100%',
  backgroundRepeat: 'no-repeat',
}));
