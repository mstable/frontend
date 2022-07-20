import { Radio as MuiRadio, Stack } from '@mui/material';

export default {
  title: 'Theme/Radio',
  component: MuiRadio,
};

export const Radio = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiRadio defaultChecked />
      <MuiRadio />
      <MuiRadio disabled />
      <MuiRadio disabled checked />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiRadio size="small" defaultChecked />
      <MuiRadio size="small" />
      <MuiRadio size="small" disabled />
      <MuiRadio size="small" disabled checked />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiRadio color="secondary" defaultChecked />
      <MuiRadio color="secondary" />
      <MuiRadio color="secondary" disabled />
      <MuiRadio color="secondary" disabled checked />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiRadio color="secondary" size="small" defaultChecked />
      <MuiRadio color="secondary" size="small" />
      <MuiRadio color="secondary" size="small" disabled />
      <MuiRadio color="secondary" size="small" disabled checked />
    </Stack>
  </Stack>
);
