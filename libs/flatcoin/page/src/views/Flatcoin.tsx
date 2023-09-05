import { useIsMobile } from '@frontend/shared-hooks';
import { ErrorBoundary, ErrorCard } from '@frontend/shared-ui';
import { Grid, Stack } from '@mui/material';

import { Jumbo } from '../components/Jumbo';
import { MobileBottomCard } from '../components/MobileBottomCard';
import { Performance } from '../components/Performance';
import { AnnouncedOrders } from '../components/Positions/AnnouncedOrders';
import { LeveragePositions } from '../components/Positions/Leverage';
import { StablePosition } from '../components/Positions/Stable';
import { TradingPanel } from '../components/TradingPanel';
import { useOrderExecutionListener } from '../hooks/useOrderExecutionListener';
import { FlatcoinProvider } from '../state';

import type { FC } from 'react';

const FlatcoinContent: FC = () => {
  const isMobile = useIsMobile();
  useOrderExecutionListener();

  return (
    <Stack direction="column" alignItems="flex-start">
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={8}
          order={{ xs: 2, md: 1 }}
          mb={{ xs: 12, md: 0 }}
        >
          <Stack direction="column" spacing={2}>
            <ErrorBoundary ErrorComponent={<ErrorCard pb={8} />}>
              <Jumbo pb={6} />
            </ErrorBoundary>
            <ErrorBoundary ErrorComponent={<ErrorCard />}>
              <Performance />
            </ErrorBoundary>
            {!isMobile && (
              <ErrorBoundary ErrorComponent={<ErrorCard />}>
                <LeveragePositions />
              </ErrorBoundary>
            )}
          </Stack>
        </Grid>
        {isMobile ? (
          <MobileBottomCard />
        ) : (
          <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
            <ErrorBoundary ErrorComponent={<ErrorCard />}>
              <TradingPanel />
            </ErrorBoundary>
            <ErrorBoundary ErrorComponent={<ErrorCard />}>
              <StablePosition sx={{ mt: 2 }} />
            </ErrorBoundary>
            <ErrorBoundary ErrorComponent={<ErrorCard />}>
              <AnnouncedOrders sx={{ mt: 2 }} />
            </ErrorBoundary>
          </Grid>
        )}
      </Grid>
    </Stack>
  );
};

export const Flatcoin = () => {
  return (
    <FlatcoinProvider>
      <FlatcoinContent />
    </FlatcoinProvider>
  );
};
