import { Stack } from '@mui/material';

import { InfoTooltip as Comp } from './index';

export default {
  title: 'Components/InfoTooltip',
  component: Comp,
};

export const InfoTooltip = () => (
  <Stack>
    <Comp label="This is a tooltip message" />
    <Comp label="This is a tooltip message" size={24} />
    <Comp label="This is a tooltip message" size={30} weight="bold" />
  </Stack>
);
