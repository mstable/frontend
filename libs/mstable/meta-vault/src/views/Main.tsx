import { useEffect, useState } from 'react';

import { Footer } from '@frontend/mstable-footer';
import { addresses } from '@frontend/shared-constants';
import { getMixins } from '@frontend/shared-utils';
import { Stack } from '@mui/material';
import { Outlet } from '@tanstack/react-location';
import { pathOr } from 'ramda';
import { useAccount, useNetwork } from 'wagmi';

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
  const { address: walletAddress } = useAccount();
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (walletAddress && chain?.id) {
      setAddress(pathOr(null, [chain?.id, 'ERC4626', 'TVG'], addresses));
    }
  }, [chain?.id, walletAddress]);

  return (
    <Provider key={address} initialState={{ address }}>
      <MainWrapped />
    </Provider>
  );
};
