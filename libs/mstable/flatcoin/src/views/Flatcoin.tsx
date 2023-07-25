import { useIsMobile } from '@frontend/shared-hooks';
import { useTrack } from '@frontend/shared-providers';
import { ErrorBoundary, ErrorCard } from '@frontend/shared-ui';
import { ArrowLeft } from '@mui/icons-material';
import { Button, Grid, Stack } from '@mui/material';
import { useNavigate } from '@tanstack/react-location';
import { useIntl } from 'react-intl';

import { Jumbo } from '../components/Jumbo';
import { Performance } from '../components/Performance';
import { Positions } from '../components/Positions';
import { TradingPanel } from '../components/TradingPanel';
import { FlatcoinProvider } from '../state';

import type { FC } from 'react';
import { PositionType } from '../types';

const FlatcoinContent: FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const track = useTrack();
  const isMobile = useIsMobile();

  return (
    <Stack direction="column" alignItems="flex-start">
      <Button
        variant="text"
        size="small"
        onClick={() => {
          navigate({ to: '/' });
        }}
        sx={{ mb: 1 }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <ArrowLeft width={16} height={16} />
          {intl.formatMessage({ defaultMessage: 'Explore', id: '7JlauX' })}
        </Stack>
      </Button>
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
        <Jumbo pb={8} />
      </ErrorBoundary>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
          <Stack direction="column" spacing={2}>
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
              <Positions />
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
