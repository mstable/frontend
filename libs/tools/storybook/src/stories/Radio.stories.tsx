import { Radio, Stack } from '@mui/material';

export default {
  title: 'Theme/Radio',
  component: Radio,
};

const Template = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Stack direction="row" spacing={2} alignItems="center">
      <Radio defaultChecked />
      <Radio />
      <Radio disabled />
      <Radio disabled checked />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Radio size="small" defaultChecked />
      <Radio size="small" />
      <Radio size="small" disabled />
      <Radio size="small" disabled checked />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Radio color="secondary" defaultChecked />
      <Radio color="secondary" />
      <Radio color="secondary" disabled />
      <Radio color="secondary" disabled checked />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Radio color="secondary" size="small" defaultChecked />
      <Radio color="secondary" size="small" />
      <Radio color="secondary" size="small" disabled />
      <Radio color="secondary" size="small" disabled checked />
    </Stack>
  </Stack>
);

export const Light = Template.bind({});
Light.args = { themeMode: 'light' };

export const Dark = Template.bind({});
Dark.args = { themeMode: 'dark' };
