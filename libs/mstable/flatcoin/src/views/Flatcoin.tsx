import { useIsMobile } from '@frontend/shared-hooks';
import { useTrack } from '@frontend/shared-providers';
import { ErrorBoundary, ErrorCard } from '@frontend/shared-ui';
import { Grid, Stack } from '@mui/material';

import { Jumbo } from '../components/Jumbo';
import { Performance } from '../components/Performance';
import { AnnouncedOrders } from '../components/Positions/AnnouncedOrders';
import { LeveragePositions } from '../components/Positions/Leverage';
import { StablePosition } from '../components/Positions/Stable';
import { TradingPanel } from '../components/TradingPanel';
import { FlatcoinProvider } from '../state';

import type { FC } from 'react';

import type { PositionType } from '../types';

const FlatcoinContent: FC = () => {
  // const intl = useIntl();
  // const navigate = useNavigate();
  const track = useTrack();
  const isMobile = useIsMobile();

  return (
    <Stack direction="column" alignItems="flex-start">
      {/*<Button*/}
      {/*  variant="text"*/}
      {/*  size="small"*/}
      {/*  onClick={() => {*/}
      {/*    navigate({ to: '/' });*/}
      {/*  }}*/}
      {/*  sx={{ mb: 1 }}*/}
      {/*>*/}
      {/*  <Stack direction="row" alignItems="center" spacing={0.5}>*/}
      {/*    <ArrowLeft width={16} height={16} />*/}
      {/*    {intl.formatMessage({ defaultMessage: 'Explore', id: '7JlauX' })}*/}
      {/*  </Stack>*/}
      {/*</Button>*/}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
          <Stack direction="column" spacing={2}>
            <ErrorBoundary
              ErrorComponent={
                <ErrorCard
                  pb={8}
                  onMount={() => {
                    track('error', {
                      name: 'Unhandled Error: Flatcoin/Leveraged Info',
                    });
                  }}
                />
              }
            >
              <Jumbo pb={6} />
            </ErrorBoundary>
            <ErrorBoundary
              ErrorComponent={
                <ErrorCard
                  onMount={() => {
                    track('error', {
                      name: 'Unhandled Error: Flatcoin Performance Chart',
                    });
                  }}
                />
              }
            >
              <Performance />
            </ErrorBoundary>
            <ErrorBoundary
              ErrorComponent={
                <ErrorCard
                  onMount={() => {
                    track('error', {
                      name: 'Unhandled Error: User Positions',
                    });
                  }}
                />
              }
            >
              <LeveragePositions />
            </ErrorBoundary>
            <ErrorBoundary
              ErrorComponent={
                <ErrorCard
                  onMount={() => {
                    track('error', {
                      name: 'Unhandled Error: User Announced Orders',
                    });
                  }}
                />
              }
            >
              <AnnouncedOrders />
            </ErrorBoundary>
          </Stack>
        </Grid>
        {!isMobile && (
          <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
            <ErrorBoundary
              ErrorComponent={
                <ErrorCard
                  onMount={() => {
                    track('error', {
                      name: 'Unhandled Error: Trading Panel',
                    });
                  }}
                />
              }
            >
              <TradingPanel />
            </ErrorBoundary>
            <ErrorBoundary
              ErrorComponent={
                <ErrorCard
                  onMount={() => {
                    track('error', {
                      name: 'Unhandled Error: Stable Position Card',
                    });
                  }}
                />
              }
            >
              <StablePosition sx={{ mt: 2 }} />
            </ErrorBoundary>
          </Grid>
        )}
      </Grid>
    </Stack>
  );
};

export const Flatcoin = () => {
  // TODO: read from config constants
  const configs: Record<Lowercase<PositionType>, any> = {
    flatcoin: {
      name: 'Flatcoin',
    },
    leveragedeth: {
      name: 'Leveraged ETH',
    },
  };

  return (
    <FlatcoinProvider
      initialState={{
        configs,
      }}
    >
      <FlatcoinContent />
    </FlatcoinProvider>
  );
};
