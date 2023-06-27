import { useIsMobile } from '@frontend/shared-hooks';
import { useTrack } from '@frontend/shared-providers';
import { ErrorBoundary, ErrorCard } from '@frontend/shared-ui';
import { TokenIconRevamp } from '@frontend/shared-ui';
import { Button, Grid, Stack } from '@mui/material';
import { useNavigate } from '@tanstack/react-location';
import { ArrowLeft } from 'phosphor-react';
import { useIntl } from 'react-intl';

import { MobileBottomCard } from '../components/MobileBottomCard';
import { NetworkAlert } from '../components/NetworkAlert';
import { Position } from '../components/Position';
import { Strategy } from '../components/Strategy';
import { TradingModal } from '../components/TradingModal';
import { TradingPanel } from '../components/TradingPanel';
import { VaultJumbo } from '../components/VaultJumbo';
import { VaultPerformance } from '../components/VaultPerformance';
import { useCoreUiKitInitialization } from '../hooks';
import { VaultProvider } from '../state';

import type { PoolConfig } from '@dhedge/core-ui-kit/types';
import type { StackProps } from '@mui/material';

interface VaultProps extends StackProps {
  config: PoolConfig;
}

const VaultContent = ({ config, ...props }: VaultProps) => {
  const intl = useIntl();
  const track = useTrack();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useCoreUiKitInitialization();

  return (
    <>
      <Stack direction="column" alignItems="flex-start" {...props}>
        <NetworkAlert chainId={config.chainId} symbol={config.symbol} />
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
        <TokenIconRevamp
          symbols={[config.symbol]}
          sx={{ height: 64, width: 64, mb: 2 }}
        />
        <ErrorBoundary
          ErrorComponent={
            <ErrorCard
              pb={8}
              onMount={() => {
                track('error', {
                  name: 'Unhandled Error Vault: Vault Jumbo',
                });
              }}
            />
          }
        >
          <VaultJumbo pb={8} />
        </ErrorBoundary>

        <Grid container spacing={2}>
          <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
            <Stack direction="column" spacing={2}>
              <ErrorBoundary
                ErrorComponent={
                  <ErrorCard
                    onMount={() => {
                      track('error', {
                        name: 'Unhandled Error Vault: Performance Card',
                      });
                    }}
                  />
                }
              >
                <VaultPerformance address={config.address} />
              </ErrorBoundary>

              <ErrorBoundary
                ErrorComponent={
                  <ErrorCard
                    onMount={() => {
                      track('error', {
                        name: 'Unhandled Error Vault: Strategy Card',
                      });
                    }}
                  />
                }
              >
                <Strategy />
              </ErrorBoundary>
            </Stack>
          </Grid>
          {!isMobile && (
            <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
              <Stack direction="column" spacing={2}>
                <ErrorBoundary
                  ErrorComponent={
                    <ErrorCard
                      onMount={() => {
                        track('error', {
                          name: 'Unhandled Error Vault: Position Card',
                        });
                      }}
                    />
                  }
                >
                  <Position sx={{ marginTop: -28 }} />
                </ErrorBoundary>
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
              </Stack>
            </Grid>
          )}
        </Grid>
      </Stack>
      {isMobile && <MobileBottomCard />}
      <TradingModal />
    </>
  );
};

export const Vault = (props: VaultProps) => {
  return (
    <VaultProvider initialState={{ config: props.config }}>
      <VaultContent {...props} />
    </VaultProvider>
  );
};
