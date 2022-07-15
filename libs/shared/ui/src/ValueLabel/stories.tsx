import { USDC } from '@frontend/shared-icons';
import { Divider, Stack } from '@mui/material';

import { ValueLabel as Comp } from './index';

export default {
  title: 'Components/ValueLabel',
  component: Comp,
};

export const ValueLabel = () => (
  <Stack
    direction="row"
    p={2}
    spacing={4}
    divider={<Divider orientation="vertical" />}
  >
    <Comp label="Asset" subvalue="USDC">
      <USDC sx={{ width: 26, height: 26 }} />
    </Comp>
    <Comp
      label="TVL"
      value="1.1M"
      subvalue="+2.54% (Past Week)"
      components={{
        subvalue: {
          color: 'success.main',
        },
      }}
    />
    <Comp
      label="AV. APY"
      value="8-11%"
      subvalue="-0.32% (Past Week)"
      components={{
        subvalue: {
          color: 'error.main',
        },
      }}
    />
  </Stack>
);
