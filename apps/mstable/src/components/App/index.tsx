import { useTrack } from '@frontend/shared-providers';
import { ErrorBoundary, ErrorPage } from '@frontend/shared-ui';
import { Box, Stack } from '@mui/material';
import { Outlet } from '@tanstack/react-location';
import { useEffectOnce } from 'react-use';
import { useNetwork } from 'wagmi';

import { registerCharts } from '../../clients';
import { GradientBackground } from '../Backgrounds';
import { WrongNetworkPage } from '../Errors';
import { Footer } from '../Footer';
import { Topnav } from '../Topnav';

export const App = () => {
  const track = useTrack();
  const { chain } = useNetwork();

  useEffectOnce(() => {
    registerCharts();
  });

  return (
    <ErrorBoundary
      ErrorComponent={
        <ErrorPage
          height={1}
          width={1}
          sx={(theme) => theme.mixins.paddings.page}
          onMount={() => {
            track('error', { name: 'Unhandled Error Main Page' });
          }}
        />
      }
    >
      <Stack
        direction="column"
        sx={{
          width: 1,
          height: 1,
        }}
      >
        <Topnav />
        <GradientBackground
          display="flex"
          flexDirection="column"
          height={1}
          width={1}
          sx={{
            paddingY: { xs: 1, sm: 2, md: 2.5 },
            paddingX: { xs: 2, sm: 4, md: 8, lg: 16, xl: 30 },
          }}
        >
          <Box minHeight="80vh" pt={{ xs: 2, md: 5 }}>
            {/* <SunsetBanner borderRadius={3} my={4} /> */}
            {chain?.unsupported ? <WrongNetworkPage /> : <Outlet />}
          </Box>
          <Footer py={4} />
        </GradientBackground>
      </Stack>
    </ErrorBoundary>
  );
};
