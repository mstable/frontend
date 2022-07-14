import { Box } from '@mui/material';

import type { BoxProps } from '@mui/material';

export const GradientBackground = (props: BoxProps) => (
  <Box
    {...props}
    sx={{
      ...props?.sx,
    }}
  />
);
