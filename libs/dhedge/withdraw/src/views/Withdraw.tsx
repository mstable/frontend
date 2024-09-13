import { Stack } from '@mui/material';

import { BurnForm } from '../components/BurnForm';
import { UnclaimedTokens } from '../components/UnclaimedTokens';

import type { FC } from 'react';

export const Withdraw: FC = () => {
  return (
    <Stack gap={4} pt={4}>
      <UnclaimedTokens />
      <BurnForm />
    </Stack>
  );
};
