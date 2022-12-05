import { useMemo } from 'react';

import { alpha, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { mergeDeepRight } from 'ramda';

import type { MotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

export type ContentContainerProps = {
  children: ReactNode;
  direction?: 'row' | 'column';
  color?: string;
  accentBkg?: boolean;
  square?: boolean;
} & MotionProps;

export const ContentContainer = ({
  direction = 'row',
  color,
  accentBkg,
  square,
  ...rest
}: ContentContainerProps) => {
  const theme = useTheme();

  const fill = color ?? theme.palette.info.main;

  const background = useMemo(
    () =>
      accentBkg
        ? `linear-gradient(45deg, ${alpha(fill, 0.2)} 0%, ${alpha(
            fill,
            0.1,
          )} 100%)`
        : 'transparent',
    [accentBkg, fill],
  );

  return (
    <motion.div
      {...rest}
      style={mergeDeepRight(
        {
          display: 'flex',
          flexDirection: direction,
          alignItems: 'center',
          justifyContent: square ? 'center' : 'flex-start',
          border: `1px solid ${fill}`,
          borderRadius: square ? theme.shape.borderRadius : '53px',
          padding: theme.spacing(0.5, 1),
          columnGap: '8px',
          ...(square && { minHeight: 60 }),
          background,
        },
        rest?.style ?? {},
      )}
    />
  );
};
