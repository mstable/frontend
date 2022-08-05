import { BigDecimal } from '@frontend/shared-utils';
import { Stack } from '@mui/material';

import { TokenInput as Comp } from './index';

export default {
  title: 'Components/FormControls',
  component: Comp,
};

export const TokenInput = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Comp
      label="Tokens"
      symbol="USDC"
      placeholder="0.00"
      balance={BigDecimal.fromSimple(200)}
    />
  </Stack>
);
