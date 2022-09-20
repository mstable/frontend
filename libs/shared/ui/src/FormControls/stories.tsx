import { BigDecimal } from '@frontend/shared-utils';
import { Stack } from '@mui/material';
import { constants } from 'ethers';

import { TokenInput as Comp } from './index';

export default {
  title: 'Components/FormControls',
  component: Comp,
};

export const TokenInput = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Comp
      label="Tokens"
      token={{
        address: '0x123',
        decimals: 18,
        name: 'USDC',
        symbol: 'USDC',
        totalSupply: constants.One,
      }}
      placeholder="0.00"
      max={BigDecimal.fromSimple(200)}
    />
  </Stack>
);
