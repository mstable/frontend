import { useTrack } from '@frontend/shared-providers';
import { ErrorBoundary, ErrorCard } from '@frontend/shared-ui';
import { Button, Grid, Stack } from '@mui/material';
import { useNavigate } from '@tanstack/react-location';
import { ArrowLeft } from 'phosphor-react';
import { useIntl } from 'react-intl';

import { Strategy } from '../components/Strategy';
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
  useCoreUiKitInitialization();

  return (
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
      </Grid>
    </Stack>
  );
};

export const Vault = (props: VaultProps) => {
  return (
    <VaultProvider initialState={{ config: props.config }}>
      <VaultContent {...props} />
    </VaultProvider>
  );
};
