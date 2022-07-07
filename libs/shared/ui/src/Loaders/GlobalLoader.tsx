import { Backdrop, CircularProgress } from '@mui/material';

import type { BackdropProps } from '@mui/material';

export const GlobalLoader = ({
  sx,
  ...rest
}: Omit<BackdropProps, 'open' | 'children'>) => (
  <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, ...sx }}
    open
    {...rest}
  >
    <CircularProgress />
  </Backdrop>
);
