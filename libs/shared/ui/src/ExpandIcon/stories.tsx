import { Stack } from '@mui/material';

import { ExpandIcon as Comp } from './index';

export default {
  title: 'Components/Expand Icon',
  component: Comp,
};

export const ExpandIcon = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Comp expanded />
    <Comp expanded={false} />
  </Stack>
);
