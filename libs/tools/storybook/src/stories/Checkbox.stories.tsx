import { Checkbox, Stack } from '@mui/material';

export default {
  title: 'Theme/Checkbox',
  component: Checkbox,
};

const Template = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Stack direction="row" spacing={2} alignItems="center">
      <Checkbox defaultChecked />
      <Checkbox />
      <Checkbox indeterminate />
      <Checkbox disabled />
      <Checkbox disabled checked />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Checkbox size="small" defaultChecked />
      <Checkbox size="small" />
      <Checkbox size="small" indeterminate />
      <Checkbox size="small" disabled />
      <Checkbox size="small" disabled checked />
    </Stack>
  </Stack>
);

export const Light = Template.bind({});
Light.args = { themeMode: 'light' };

export const Dark = Template.bind({});
Dark.args = { themeMode: 'dark' };
