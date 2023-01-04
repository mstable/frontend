import { alpha } from '@mui/material';

export const linearGradient = (orientation: string, steps: string[]) =>
  `linear-gradient(${orientation}, ${steps.join(', ')})`;

export const maskLinearGradient = (
  orientation: string,
  maskColor: string,
  threshold: string,
  maskOpacity = 0.2,
) =>
  linearGradient(orientation, [
    `${maskColor} 0%`,
    `${alpha(maskColor, maskOpacity)} ${threshold}%`,
    'transparent 100%',
  ]);
