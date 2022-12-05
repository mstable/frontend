import { useMemo } from 'react';

import { alpha, Box, useTheme } from '@mui/material';
import { CaretDown, CaretLeft, CaretRight, CaretUp } from 'phosphor-react';
import { mergeDeepRight } from 'ramda';

import type { BoxProps } from '@mui/material';
import type { IconWeight } from 'phosphor-react';

export type ArrowProps = {
  color?: string;
  solid?: boolean;
  thickness?: number;
  caretType?: IconWeight;
  direction?: 'up' | 'right' | 'down' | 'left';
  hideCaret?: boolean;
} & Omit<BoxProps, 'children' | 'direction'>;

export const Arrow = ({
  color,
  solid,
  direction = 'right',
  thickness = 2,
  caretType = 'bold',
  hideCaret,
  ...rest
}: ArrowProps) => {
  const theme = useTheme();
  const vertical = ['up', 'down'].includes(direction);
  const end = vertical
    ? ['up', 'down'].includes(direction)
      ? direction
      : 'up'
    : ['right', 'left'].includes(direction)
    ? direction
    : 'right';
  const fill = color ?? theme.palette.info.main;

  const background = useMemo(
    () =>
      solid
        ? fill
        : `linear-gradient(${
            vertical ? (end === 'up' ? 0 : 180) : end === 'right' ? 90 : 270
          }deg, ${alpha(fill, 0)} 0%, ${alpha(fill, 0.4)} 30%, ${fill} 100%)`,
    [end, fill, solid, vertical],
  );

  const position = useMemo(
    () =>
      vertical
        ? {
            width: `${thickness}px`,
            left: '50%',
            top: `${!hideCaret && end === 'up' ? 2 : 0}px`,
            bottom: `${!hideCaret && end === 'down' ? 2 : 0}px`,
            transform: `translateX(-${thickness / 2}px)`,
          }
        : {
            height: `${thickness}px`,
            top: '50%',
            left: `${!hideCaret && end === 'left' ? 2 : 0}px`,
            right: `${!hideCaret && end === 'right' ? 2 : 0}px`,
            transform: `translateY(-${thickness / 2}px)`,
          },
    [end, hideCaret, thickness, vertical],
  );

  const caretProps = useMemo(
    () => ({ color: fill, weight: caretType, size: 16 }),
    [caretType, fill],
  );

  return (
    <Box
      minWidth={16}
      minHeight={16}
      {...rest}
      sx={mergeDeepRight(rest?.sx, {
        display: 'flex',
        flexDirection: vertical ? 'column' : ' row',
        justifyContent: ['up', 'left'].includes(end)
          ? 'flex-start'
          : 'flex-end',
        alignItems: 'center',
        position: 'relative',
        svg: {
          transform: vertical
            ? `translateY(${end === 'up' ? -4 : 4}px)`
            : `translateX(${end === 'right' ? 4 : -4}px)`,
        },
        '::after': {
          position: 'absolute',
          content: '""',
          background,
          ...position,
        },
      })}
    >
      {!hideCaret && (
        <>
          {vertical ? (
            end === 'up' ? (
              <CaretUp {...caretProps} />
            ) : (
              <CaretDown {...caretProps} />
            )
          ) : end === 'right' ? (
            <CaretRight {...caretProps} />
          ) : (
            <CaretLeft {...caretProps} />
          )}
        </>
      )}
    </Box>
  );
};
