import { alpha, Stack, useTheme } from '@mui/material';
import { mergeDeepRight } from 'ramda';

import type { StackProps } from '@mui/material';

export const IconContainer = (props: StackProps) => (
  <Stack
    direction="row"
    spacing={1}
    alignItems="center"
    {...props}
    sx={(theme) =>
      mergeDeepRight(props?.sx, {
        border: `1px solid ${theme.palette.info.main}`,
        borderRadius: '53px',
        padding: 1,
        backgroundColor: alpha(theme.palette.info.main, 0.2),
      })
    }
  />
);

export const SquaredIconContainer = (props: StackProps) => (
  <Stack
    direction="column"
    spacing={1}
    alignItems="center"
    {...props}
    sx={(theme) =>
      mergeDeepRight(props?.sx, {
        border: `1px solid ${theme.palette.info.main}`,
        borderRadius: 1,
        padding: 1,
        backgroundColor: alpha(theme.palette.info.main, 0.2),
      })
    }
  />
);

export const ArrowRight = (props: StackProps) => {
  const theme = useTheme();

  return (
    <Stack
      {...props}
      direction="row"
      alignItems="center"
      sx={mergeDeepRight(props?.sx, {
        position: 'relative',
        '::after': {
          position: 'absolute',
          content: '""',
          background: `linear-gradient(90deg, ${alpha(
            theme.palette.info.main,
            0,
          )} 0%, ${alpha(theme.palette.info.main, 0.4)} 30%, ${
            theme.palette.info.main
          } 100%)`,
          height: 2,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: 1,
          top: '50%',
          left: 0,
        },
      })}
    />
  );
};

export const ArrowUp = (props: StackProps) => {
  const theme = useTheme();

  return (
    <Stack
      {...props}
      direction="row"
      alignItems="center"
      sx={mergeDeepRight(props?.sx, {
        position: 'relative',
        '::after': {
          position: 'absolute',
          content: '""',
          background: `linear-gradient(0deg, ${alpha(
            theme.palette.info.main,
            0,
          )} 0%, ${alpha(theme.palette.info.main, 0.4)} 30%, ${
            theme.palette.info.main
          } 100%)`,
          width: 2,
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          left: '50%',
        },
      })}
    />
  );
};
