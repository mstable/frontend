import { Box } from '@mui/material';

import { BurnForm } from '../components/BurnForm';

import type { FC } from 'react';

export const Withdraw: FC = () => {
  return (
    <Box pt={4}>
      <BurnForm />
    </Box>
  );
};
