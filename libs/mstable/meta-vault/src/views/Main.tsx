import { getMixins } from '@frontend/shared-utils';
import { Stack } from '@mui/material';
import { Outlet } from '@tanstack/react-location';

const MainWrapped = () => {
  return (
    <Stack width={1} height={1} sx={getMixins(['paddings.page'])}>
      <Outlet />
    </Stack>
  );
};

export const Main = () => <MainWrapped />;
