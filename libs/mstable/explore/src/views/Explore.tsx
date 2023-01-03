import { useTrack } from '@frontend/shared-providers';
import { ErrorBoundary, ErrorCard } from '@frontend/shared-ui';
import { Stack } from '@mui/material';

import { FeatureCard } from '../components/FeatureCard';
import { Vaults } from '../components/Vaults';

import type { StackProps } from '@mui/material';

export const Explore = (props: StackProps) => {
  const track = useTrack();

  return (
    <Stack direction="column" spacing={4} {...props}>
      <ErrorBoundary
        ErrorComponent={
          <ErrorCard
            onMount={() => {
              track('error', { name: 'Unhandled Error Explore: Feature Card' });
            }}
          />
        }
      >
        <FeatureCard />
      </ErrorBoundary>
      <ErrorBoundary
        ErrorComponent={
          <ErrorCard
            onMount={() => {
              track('error', { name: 'Unhandled Error Explore: Vaults' });
            }}
          />
        }
      >
        <Vaults />
      </ErrorBoundary>
    </Stack>
  );
};
