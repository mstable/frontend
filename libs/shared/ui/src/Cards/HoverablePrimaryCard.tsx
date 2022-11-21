import React from 'react';

import { alpha, Stack } from '@mui/material';
import { mergeDeepRight } from 'ramda';

import type { StackProps, SxProps, Theme } from '@mui/material';

export type HoverableCardProps = {
  transparentBackground?: boolean;
  primaryColor: string;
  children: React.ReactNode;
} & StackProps;

export const hoverPrimarySx = (theme: Theme, color: string): SxProps => ({
  background: `linear-gradient(180deg, ${alpha(color, 0.12)} 0%, ${alpha(
    theme.palette.background.default,
    0.4,
  )} 100%)`,
  border: `1px solid ${alpha(color, 0.4)}`,
  boxShadow: `0px 0px 20px ${alpha(color, 0.2)}`,
});

export const HoverablePrimaryCard = ({
  transparentBackground,
  primaryColor,
  children,
  ...rest
}: HoverableCardProps) => {
  return (
    <Stack
      {...rest}
      sx={(theme) =>
        mergeDeepRight(rest?.sx, {
          borderRadius: 2,
          background: transparentBackground
            ? alpha(theme.palette.background.default, 0.4)
            : `linear-gradient(180deg, ${alpha(primaryColor, 0.08)} 0%, ${alpha(
                theme.palette.background.default,
                0.4,
              )} 100%)`,
          border: `1px solid ${theme.palette.background.highlight}`,
          boxShadow: 1,
          '&:hover': hoverPrimarySx(theme, primaryColor),
        })
      }
    >
      {children}
    </Stack>
  );
};
