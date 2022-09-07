import InfoIcon from '@mui/icons-material/InfoRounded';
import { Chip, Stack } from '@mui/material';

export default {
  title: 'Theme/Chip',
  component: Chip,
};

const label = 'Chip Name';

const Template = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Stack direction="row" spacing={2} alignItems="center">
      <Chip label={label} />
      <Chip color="secondary" label={label} />
      <Chip variant="outlined" label={label} />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Chip variant="active" label={label} />
      <Chip variant="active" color="secondary" label={label} />
      <Chip variant="active" label={label} />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Chip icon={<InfoIcon />} label={label} />
      <Chip icon={<InfoIcon />} color="secondary" label={label} />
      <Chip icon={<InfoIcon />} variant="outlined" label={label} />
    </Stack>
    <br />
    <Stack direction="row" spacing={2} alignItems="center">
      <Chip label={label} size="medium" />
      <Chip color="secondary" label={label} size="medium" />
      <Chip variant="outlined" label={label} size="medium" />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Chip variant="active" label={label} size="medium" />
      <Chip variant="active" color="secondary" label={label} size="medium" />
      <Chip variant="active" label={label} size="medium" />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Chip icon={<InfoIcon />} label={label} size="medium" />
      <Chip icon={<InfoIcon />} color="secondary" label={label} size="medium" />
      <Chip
        icon={<InfoIcon />}
        variant="outlined"
        label={label}
        size="medium"
      />
    </Stack>
    <br />
    <Stack direction="row" spacing={2} alignItems="center">
      <Chip label={label} size="large" />
      <Chip color="secondary" label={label} size="large" />
      <Chip variant="outlined" label={label} size="large" />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Chip variant="active" label={label} size="large" />
      <Chip variant="active" color="secondary" label={label} size="large" />
      <Chip variant="active" label={label} size="large" />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Chip icon={<InfoIcon />} label={label} size="large" />
      <Chip icon={<InfoIcon />} color="secondary" label={label} size="large" />
      <Chip icon={<InfoIcon />} variant="outlined" label={label} size="large" />
    </Stack>
  </Stack>
);

export const Light = Template.bind({});
Light.args = { themeMode: 'light' };

export const Dark = Template.bind({});
Dark.args = { themeMode: 'dark' };
