import { Stack } from '@mui/material';

import { TokenIcon as Comp } from './index';

export default {
  title: 'Components/TokenIcon',
  component: Comp,
};

export const TokenIcon = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Comp symbol="USDC" />
    <Comp symbol="ETH" />
    <Comp symbol="TAG" />
  </Stack>
);
