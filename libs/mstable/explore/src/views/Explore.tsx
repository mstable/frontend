import { Stack } from '@mui/material';

import { FeatureCard } from '../components/FeatureCard';
import { Vaults } from '../components/Vaults';

import type { StackProps } from '@mui/material';

export const Explore = (props: StackProps) => {
  return (
    <Stack direction="column" spacing={4} {...props}>
      <FeatureCard />
      <Vaults />
    </Stack>
  );
};
