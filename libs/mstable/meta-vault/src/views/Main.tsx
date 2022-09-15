import { useEffect, useState } from 'react';

import { Footer } from '@frontend/mstable-footer';
import { usdc3crv } from '@frontend/shared-constants';
import { getMixins } from '@frontend/shared-utils';
import { Stack } from '@mui/material';
import { Outlet } from '@tanstack/react-location';
import { useAccount, useNetwork } from 'wagmi';

import { MetavaultProvider } from '../state';

import type { Metavault } from '@frontend/shared-constants';

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
  const [metavault, setMetavault] = useState<Metavault | null>(null);

  useEffect(() => {
    if (walletAddress && chain?.id) {
      setMetavault(usdc3crv[chain.id]);
    }
  }, [chain?.id, walletAddress]);

  return (
    <MetavaultProvider key={metavault?.address} initialState={{ metavault }}>
      <MainWrapped />
    </MetavaultProvider>
  );
};
