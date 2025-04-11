import { Stack } from '@mui/material';

import { BurnForm } from '../components/BurnForm';
import { Hero } from '../components/Hero';
import { UnclaimedTokens } from '../components/UnclaimedTokens';

export const BurnMusd = () => {
  return (
    <Stack gap={4}>
      <Hero />
      <UnclaimedTokens />
      <BurnForm />
    </Stack>
  );
};
