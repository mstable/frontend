import { useIsMobile } from '@frontend/shared-hooks';
import { useTrack } from '@frontend/shared-providers';
import { ErrorBoundary, ErrorCard } from '@frontend/shared-ui';
import { TokenIconRevamp } from '@frontend/shared-ui';
import { Grid, Stack } from '@mui/material';

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
  const track = useTrack();
  const isMobile = useIsMobile();

  useCoreUiKitInitialization();

  return (
    <>
      <Stack direction="column" alignItems="flex-start" {...props}>
        <NetworkAlert chainId={config.chainId} symbol={config.symbol} />
        {/* TODO: re add back button when more vaults will be added */}
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
            <Stack direction="column" spacing={2} pt={6}>
              <Grid container spacing={2}>
                <Stack direction="row" spacing={4}>
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
                    <VaultJumbo pb={6} />
                  </ErrorBoundary>
                </Stack>
              </Grid>
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
                          name: 'Unhandled Error Vault: Position Card',
                        });
                      }}
                    />
                  }
                >
                  <Position />
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
