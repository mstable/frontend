import { cloneElement } from 'react';

import { Box, useTheme } from '@mui/material';
import { mergeDeepRight } from 'ramda';

import SimplePurpleSvg from './simple-purple.svg';
import TriplePurpleSvg from './triple-purple.svg';

import type { BoxProps } from '@mui/material';
import type { IconProps } from 'phosphor-react';
import type { ReactElement } from 'react';

export type SimplePurpleBkgIconProps = {
  icon: ReactElement<IconProps>;
} & IconProps &
  Omit<BoxProps, 'children' | 'color' | 'size' | 'weight' | 'mirrored' | 'alt'>;

export const SimplePurpleBkgIcon = ({
  icon,
  color,
  size = 24,
  weight = 'fill',
  mirrored,
  alt,
  ...rest
}: SimplePurpleBkgIconProps) => {
  const theme = useTheme();

  return (
    <Box
      {...rest}
      sx={mergeDeepRight(rest?.sx, {
        width: size,
        height: size,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${SimplePurpleSvg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        '.ph-icon': {
          padding: '17.5%',
        },
      })}
    >
      {cloneElement(icon, {
        color: color ?? theme.palette.icons.revertedColor,
        size,
        weight,
        mirrored,
        alt,
        className: 'ph-icon',
      })}
    </Box>
  );
};

export type TriplePurpleBkgIconProps = {
  icon: ReactElement<IconProps>;
} & IconProps &
  Omit<BoxProps, 'children' | 'color' | 'size' | 'weight' | 'mirrored' | 'alt'>;

export const TriplePurpleBkgIcon = ({
  icon,
  color,
  size = 28,
  weight = 'fill',
  mirrored,
  alt,
  ...rest
}: TriplePurpleBkgIconProps) => {
  const theme = useTheme();

  return (
    <Box
      {...rest}
      sx={mergeDeepRight(rest?.sx, {
        width: size,
        height: size,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${TriplePurpleSvg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        '.ph-icon': {
          padding: '25%',
        },
      })}
    >
      {cloneElement(icon, {
        color: color ?? theme.palette.icons.revertedColor,
        size,
        weight,
        mirrored,
        alt,
        className: 'ph-icon',
      })}
    </Box>
  );
};
