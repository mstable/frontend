import { useIsMobile } from '@frontend/shared-hooks';
import { useTrack } from '@frontend/shared-providers';
import { ErrorBoundary, ErrorCard } from '@frontend/shared-ui';
import { ArrowLeft } from '@mui/icons-material';
import { Button, Grid, Stack } from '@mui/material';
import { useNavigate } from '@tanstack/react-location';
import { useIntl } from 'react-intl';

import { TradingPanel } from '../components/TradingPanel';
import { FlatcoinPageProvider } from '../state';

import type { StackProps } from '@mui/material';
import type { FC } from 'react';

export const Flatcoin: FC<StackProps> = (props) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const track = useTrack();
  const isMobile = useIsMobile();

  return (
    <FlatcoinPageProvider>
      <Stack direction="column" alignItems="flex-start" {...props}>
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
          {/* Flatcoin/Leveraged Info: APY, TVL, Funding Rate, Open Interest, Skew */}
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
                {/*  Performance Chart */}
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
                {/* User Positions Table */}
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
    </FlatcoinPageProvider>
  );
};
