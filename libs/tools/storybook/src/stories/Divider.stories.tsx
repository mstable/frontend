import { Divider, Stack, Typography } from '@mui/material';

import { Lorem } from '../components/LoremIpsum';

export default {
  title: 'Theme/Divider',
  component: Divider,
};

const Template = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Lorem />
    <Divider />
    <Lorem />
    <Divider role="presentation">
      <Typography variant="value6">Divider text</Typography>
    </Divider>
    <Lorem />
    <Divider light />
    <Lorem />
    <Divider light role="presentation">
      <Typography variant="value6">Divider text</Typography>
    </Divider>
    <Lorem />
  </Stack>
);

export const Light = Template.bind({});
Light.args = { themeMode: 'light' };

export const Dark = Template.bind({});
Dark.args = { themeMode: 'dark' };
