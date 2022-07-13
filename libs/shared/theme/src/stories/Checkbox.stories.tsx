import { Checkbox as MuiCheckbox, Stack } from '@mui/material';

export default {
  title: 'Theme/Checkbox',
  component: MuiCheckbox,
};

export const Checkbox = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiCheckbox defaultChecked />
      <MuiCheckbox />
      <MuiCheckbox indeterminate />
      <MuiCheckbox disabled />
      <MuiCheckbox disabled checked />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiCheckbox size="small" defaultChecked />
      <MuiCheckbox size="small" />
      <MuiCheckbox size="small" indeterminate />
      <MuiCheckbox size="small" disabled />
      <MuiCheckbox size="small" disabled checked />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiCheckbox color="secondary" defaultChecked />
      <MuiCheckbox color="secondary" />
      <MuiCheckbox color="secondary" indeterminate />
      <MuiCheckbox color="secondary" disabled />
      <MuiCheckbox color="secondary" disabled checked />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiCheckbox color="secondary" size="small" defaultChecked />
      <MuiCheckbox color="secondary" size="small" />
      <MuiCheckbox color="secondary" size="small" indeterminate />
      <MuiCheckbox color="secondary" size="small" disabled />
      <MuiCheckbox color="secondary" size="small" disabled checked />
    </Stack>
  </Stack>
);
