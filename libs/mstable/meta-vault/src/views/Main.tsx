import { Footer } from '@frontend/mstable-footer';
import { Stack } from '@mui/material';
import { Outlet } from '@tanstack/react-location';

export const Main = () => {
  return (
    <Stack direction="column" width={1} height={1}>
      <Outlet />
      <Footer sx={(theme) => theme.mixins.paddings.jumbo} />
    </Stack>
  );
};
