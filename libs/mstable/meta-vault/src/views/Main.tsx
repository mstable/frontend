import { useEffect, useState } from 'react';

import { Footer } from '@frontend/mstable-footer';
import { usdc3crv } from '@frontend/shared-constants';
import { Stack } from '@mui/material';
import { Outlet } from '@tanstack/react-location';
import { chainId, useAccount, useNetwork } from 'wagmi';

import { MetavaultProvider } from '../state';

import type { Metavault } from '@frontend/shared-constants';

export const Main = () => {
  const { chain } = useNetwork();
  const { address: walletAddress } = useAccount();
  const [metavault, setMetavault] = useState<Metavault | null>(null);

  useEffect(() => {
    setMetavault(usdc3crv[chain?.id ?? chainId.mainnet]);
  }, [chain?.id, walletAddress]);

  return (
    <MetavaultProvider key={metavault?.address} initialState={{ metavault }}>
      <Stack direction="column" width={1} height={1}>
        <Outlet />
        <Footer sx={(theme) => theme.mixins.paddings.page} />
      </Stack>
    </MetavaultProvider>
  );
};
