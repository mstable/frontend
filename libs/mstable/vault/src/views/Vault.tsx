import { useTrack } from '@frontend/shared-providers';
import { ErrorBoundary, ErrorCard, MVIcon } from '@frontend/shared-ui';
import { Button, Stack } from '@mui/material';
import { useNavigate } from '@tanstack/react-location';
import { ArrowLeft } from 'phosphor-react';
import { useIntl } from 'react-intl';

import { VaultJumbo } from '../components/VaultJumbo';
import { VaultProvider } from '../state';

import type { PoolConfig } from '@dhedge/core-ui-kit/types';
import type { StackProps } from '@mui/material';

interface VaultProps extends StackProps {
  config: PoolConfig;
}

export const Vault = ({ config, ...props }: VaultProps) => {
  const intl = useIntl();
  const track = useTrack();
  const navigate = useNavigate();

  return (
    <VaultProvider initialState={{ config }}>
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
        <MVIcon
          address={config.address}
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
      </Stack>
    </VaultProvider>
  );
};
