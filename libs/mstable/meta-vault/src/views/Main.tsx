import { Footer } from '@frontend/mstable-footer';
import { getMixins } from '@frontend/shared-utils';
import { Stack } from '@mui/material';
import { Outlet } from '@tanstack/react-location';

const MainWrapped = () => {
  return (
    <Stack width={1} height={1} sx={getMixins(['paddings.page'])}>
      <Outlet />
      <Footer />
    </Stack>
  );
};

export const Main = () => <MainWrapped />;
