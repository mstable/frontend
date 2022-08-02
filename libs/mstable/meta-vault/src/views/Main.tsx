import { Footer } from '@frontend/mstable-footer';
import { addresses } from '@frontend/shared-constants';
import { getMixins } from '@frontend/shared-utils';
import { Stack } from '@mui/material';
import { Outlet } from '@tanstack/react-location';
import { path } from 'ramda';
import { useNetwork } from 'wagmi';

import { Provider } from '../state';

const MainWrapped = () => {
  return (
    <Stack width={1} height={1} sx={getMixins(['paddings.page'])}>
      <Outlet />
      <Footer />
    </Stack>
  );
};

export const Main = () => {
  const { chain } = useNetwork();

  return (
    <Provider
      initialState={{ address: path([chain?.id, 'ERC4626', 'TVG'], addresses) }}
    >
      <MainWrapped />
    </Provider>
  );
};
