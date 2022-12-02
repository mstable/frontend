import { useEffect } from 'react';

import {
  ErrorCardWithMessage,
  useTransitionBackgroundColor,
} from '@frontend/mstable-shared-ui';
import { ErrorBoundary } from '@frontend/shared-ui';
import { Stack } from '@mui/material';

import { FeatureCard, Vaults } from '../components/Explore';

export const Explore = () => {
  const updateBkgColor = useTransitionBackgroundColor();

  useEffect(() => {
    updateBkgColor(null);
  }, [updateBkgColor]);

  return (
    <Stack direction="column" pt={{ xs: 2, md: 5 }} spacing={4}>
      <ErrorBoundary
        ErrorComponent={
          <ErrorCardWithMessage errorProps={{ name: 'Feature Card' }} />
        }
      >
        <FeatureCard />
      </ErrorBoundary>
      <ErrorBoundary
        ErrorComponent={
          <ErrorCardWithMessage errorProps={{ name: 'Vaults' }} />
        }
      >
        <Vaults />
      </ErrorBoundary>
    </Stack>
  );
};
