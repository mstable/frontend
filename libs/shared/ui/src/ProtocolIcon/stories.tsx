import { Stack } from '@mui/material';

import { ProtocolIcon as Comp } from './index';

export default {
  title: 'Components/ProtocolIcon',
  component: Comp,
};

export const ProtocolIcon = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Comp name="mstable" />
    <Comp name="curve" />
    <Comp name="convex" />
  </Stack>
);
