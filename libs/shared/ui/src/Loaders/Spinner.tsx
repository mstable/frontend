import { CircularProgress, Stack } from '@mui/material';

import type { CircularProgressProps, StackProps } from '@mui/material';

export type SpinnerProps = Pick<
  StackProps,
  'sx' | 'height' | 'width' | 'flexGrow'
> & {
  circularProgressProps?: Pick<CircularProgressProps, 'size' | 'sx'>;
};

export const Spinner = ({
  circularProgressProps,
  sx,
  ...rest
}: SpinnerProps) => (
  <Stack
    width={1}
    height={1}
    flexGrow={1}
    {...rest}
    sx={{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      ...sx,
    }}
  >
    <CircularProgress size={30} {...circularProgressProps} />
  </Stack>
);
