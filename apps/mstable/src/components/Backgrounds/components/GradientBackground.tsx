import { useMemo } from 'react';

import { alpha, Box, useTheme } from '@mui/material';
import { usePrevious } from 'react-use';

import { Provider, useTrackedState } from '../state';
import { linearGradient, maskLinearGradient } from '../utils';

import type { BoxProps } from '@mui/material';

const GradientBackgroundWrapped = (props: BoxProps) => {
  const { next } = useTrackedState();
  const {
    palette: {
      mode,
      background: { default: bkg },
    },
    mixins: {
      gradients: { colorCloud },
    },
  } = useTheme();
  const prev = usePrevious(next);

  const mainGradient = useMemo(
    () =>
      [
        maskLinearGradient(
          '0deg',
          bkg,
          mode === 'light' ? '30' : '60',
          mode === 'light' ? 0.3 : 0,
        ),
        maskLinearGradient(
          '180deg',
          bkg,
          mode === 'light' ? '40' : '60',
          mode === 'light' ? 0.2 : 0,
        ),
        colorCloud,
      ].join(','),

    [bkg, colorCloud, mode],
  );
  const nextGradient = useMemo(
    () =>
      [
        maskLinearGradient(
          '0deg',
          bkg,
          mode === 'light' ? '30' : '60',
          mode === 'light' ? 0.3 : 0,
        ),
        maskLinearGradient(
          '180deg',
          bkg,
          mode === 'light' ? '40' : '60',
          mode === 'light' ? 0.2 : 0,
        ),
        ...(next
          ? [
              linearGradient('90deg', [
                `${alpha(next, 0.5)} 0%`,
                `${alpha(next, 0.25)} 60%`,
                `${alpha(next, 0.5)} 100%`,
              ]),
            ]
          : prev
          ? [
              linearGradient('90deg', [
                `${alpha(prev, 0.5)} 0%`,
                `${alpha(prev, 0.1)} 60%`,
                `${alpha(prev, 0.5)} 100%`,
              ]),
            ]
          : []),
        bkg,
      ].join(','),
    [bkg, mode, next, prev],
  );

  return (
    <Box
      {...props}
      sx={{
        position: 'relative',
        background: mainGradient,
        backgroundSize: '100% 360px',
        backgroundRepeat: 'no-repeat',
        zIndex: 1,
        '::after': {
          position: 'absolute',
          content: '""',
          top: 0,
          left: 0,
          height: 1,
          width: 1,
          background: nextGradient,
          backgroundSize: '100% 360px',
          backgroundRepeat: 'no-repeat',
          transition: `opacity 0.5s linear`,
          opacity: next ? 1 : 0,
          zIndex: -1,
        },
        ...props?.sx,
      }}
    />
  );
};

export const GradientBackground = (props: BoxProps) => (
  <Provider>
    <GradientBackgroundWrapped {...props} />
  </Provider>
);
