import { Topnav } from '@frontend/mstable-shared-ui';
import { ErrorBoundary, ErrorPage } from '@frontend/shared-ui';
import { useUnsupportedNetworks } from '@frontend/shared-wagmi';
import { Stack } from '@mui/material';
import { Outlet } from '@tanstack/react-location';
import { useEffectOnce } from 'react-use';

import { plausible } from '../analytics';
import { registerCharts } from '../clients';

plausible.enableAutoPageviews();
plausible.enableAutoOutboundTracking();

export const App = () => {
  useUnsupportedNetworks();

  useEffectOnce(() => {
    registerCharts();
  });

  return (
    <Stack
      direction="column"
      sx={{
        width: 1,
        height: 1,
      }}
    >
      <Topnav />
      <ErrorBoundary
        ErrorComponent={
          <ErrorPage
            height={1}
            width={1}
            sx={(theme) => theme.mixins.paddings.page}
          />
        }
      >
        <Outlet />
      </ErrorBoundary>
    </Stack>
  );
};
