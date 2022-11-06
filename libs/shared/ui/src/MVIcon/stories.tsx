import { tokens } from '@mstable/metavaults-web';
import { Stack } from '@mui/material';
import { chainId } from 'wagmi';

import { MVIcon as Comp } from './index';

export default {
  title: 'Components/MVIcon',
  component: Comp,
};

export const MVIcon = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Comp address={tokens[chainId.mainnet]['mvusdc-3pcv'].address} />
  </Stack>
);
