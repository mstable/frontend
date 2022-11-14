import React from 'react';

import { RouterLink } from '@frontend/shared-ui';
import { alpha, Card, Link } from '@mui/material';
import { mergeDeepRight } from 'ramda';

import type { CardProps } from '@mui/material';

export type HoverableCardProps = {
  transparentBackground?: boolean;
  primaryColor: string;
  children: React.ReactNode;
  to: string;
} & CardProps;

export const HoverableCard = ({
  transparentBackground,
  primaryColor,
  children,
  to,
  ...rest
}: HoverableCardProps) => {
  return (
    <Link component={RouterLink} to={to}>
      <Card
        {...rest}
        sx={(theme) =>
          mergeDeepRight(rest?.sx, {
            borderRadius: 2,
            background: transparentBackground
              ? alpha(theme.palette.background.default, 0.4)
              : `linear-gradient(180deg, ${alpha(
                  primaryColor,
                  0.08,
                )} 0%, ${alpha(theme.palette.background.default, 0.4)} 100%)`,
            border: `1px solid ${theme.palette.background.highlight}`,
            boxShadow: `0px 0px 20px ${
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.05)'
            }`,
            '&:hover': {
              background: `linear-gradient(180deg, ${alpha(
                primaryColor,
                0.12,
              )} 0%, ${alpha(theme.palette.background.default, 0.4)} 100%)`,
              border: `1px solid ${alpha(primaryColor, 0.4)}`,
              boxShadow: `0px 0px 20px ${alpha(primaryColor, 0.2)}`,
            },
          })
        }
      >
        {children}
      </Card>
    </Link>
  );
};
