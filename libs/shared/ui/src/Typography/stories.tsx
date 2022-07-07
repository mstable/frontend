import { Stack } from '@mui/material';

import { MiddleTruncated as Comp } from './index';

export default {
  title: 'Components/MiddleTruncated',
  component: Comp,
};

const address = '0xe76be9c1e12416d6bc6b63d8031729747910c4f4';

export const MiddleTruncated = () => (
  <Stack
    direction="column"
    spacing={2}
    p={2}
    width={1 / 4}
    height={200}
    border="1px dashed"
  >
    <Comp>{address}</Comp>
    <Comp end={8}>{address}</Comp>
  </Stack>
);
