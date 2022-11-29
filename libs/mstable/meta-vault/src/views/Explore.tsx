import { useEffect } from 'react';

import { useTransitionBackgroundColor } from '@frontend/mstable-shared-ui';
import { Stack } from '@mui/material';

import { FeatureCard, Vaults } from '../components/Explore';

export const Explore = () => {
  const updateBkgColor = useTransitionBackgroundColor();

  useEffect(() => {
    updateBkgColor(null);
  }, [updateBkgColor]);

  return (
    <Stack direction="column" pt={{ xs: 2, md: 5 }} spacing={4}>
      <FeatureCard />
      <Vaults />
    </Stack>
  );
};
