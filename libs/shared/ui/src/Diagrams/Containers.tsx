import { useMemo } from 'react';

import { alpha, Box, Stack, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { mergeDeepRight } from 'ramda';

import type { StackProps } from '@mui/material';
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

export type LogoProps = {
  label: string;
  revertColors?: boolean;
} & StackProps;

export const Logo = ({ children, label, revertColors, ...rest }: LogoProps) => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      alignContent="space-between"
      {...rest}
    >
      <Box
        sx={{
          backgroundColor: revertColors
            ? 'icons.revertedBackground'
            : 'icons.background',
          borderRadius: '50%',
          width: 30,
          height: 30,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 1,
          svg: {
            color: revertColors ? 'icons.revertedColor' : 'icons.color',
          },
        }}
      >
        {children}
      </Box>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 'medium',
        }}
        noWrap
        color="text.secondary"
      >
        {label}
      </Typography>
    </Stack>
  );
};
