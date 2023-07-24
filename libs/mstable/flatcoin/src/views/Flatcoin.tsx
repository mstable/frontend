import { Button, Grid, Stack } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from '@tanstack/react-location';
import { ArrowLeft } from '@mui/icons-material';
import { useIntl } from 'react-intl';
import { ErrorBoundary, ErrorCard } from '@frontend/shared-ui';
import { useTrack } from '@frontend/shared-providers';
import { useIsMobile } from '@frontend/shared-hooks';
import { FlatcoinProvider } from '../state';
import { Jumbo } from '../components/Jumbo';
import { Performance } from '../components/Performance';
import { Positions } from '../components/Positions';

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
              {/* Trading Panel */}
            </ErrorBoundary>
          </Grid>
        )}
      </Grid>
    </Stack>
  );
};

export const Flatcoin = () => {
  return (
    <FlatcoinProvider initialState={{ config: { name: 'Flatcoin' } }}>
      <FlatcoinContent />
    </FlatcoinProvider>
  );
};
