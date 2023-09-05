import { useScrollToTop } from '@frontend/shared-hooks';
import {
  ErrorBoundary,
  ErrorPage,
  GradientBackground,
} from '@frontend/shared-ui';
import { Box, Stack } from '@mui/material';
import { Outlet } from '@tanstack/react-location';
import { useEffectOnce } from 'react-use';

import { registerCharts } from '../../clients';
import { Topnav } from '../Topnav';

export const App = () => {
  useScrollToTop();

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
            <Outlet />
          </Box>
        </GradientBackground>
      </Stack>
    </ErrorBoundary>
  );
};
