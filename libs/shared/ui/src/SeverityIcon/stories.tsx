import { Stack } from '@mui/material';

import { SeverityIcon as Comp } from './index';

export default {
  title: 'Components/SeverityIcon',
  component: Comp,
};

export const SeverityIcon = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Comp severity="info" />
    <Comp severity="success" />
    <Comp severity="warning" />
    <Comp severity="error" />
  </Stack>
);
