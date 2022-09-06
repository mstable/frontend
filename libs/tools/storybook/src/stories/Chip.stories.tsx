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
      <Chip label={label} clickable />
      <Chip color="secondary" label={label} clickable />
      <Chip variant="outlined" label={label} clickable />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Chip variant="active" label={label} clickable />
      <Chip variant="active" color="secondary" label={label} clickable />
      <Chip variant="active" label={label} clickable />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Chip icon={<InfoIcon />} label={label} clickable />
      <Chip icon={<InfoIcon />} color="secondary" label={label} clickable />
      <Chip icon={<InfoIcon />} variant="outlined" label={label} clickable />
    </Stack>
    <br />
    <Stack direction="row" spacing={2} alignItems="center">
      <Chip label={label} clickable size="medium" />
      <Chip color="secondary" label={label} clickable size="medium" />
      <Chip variant="outlined" label={label} clickable size="medium" />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Chip variant="active" label={label} clickable size="medium" />
      <Chip
        variant="active"
        color="secondary"
        label={label}
        clickable
        size="medium"
      />
      <Chip variant="active" label={label} clickable size="medium" />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Chip icon={<InfoIcon />} label={label} clickable size="medium" />
      <Chip
        icon={<InfoIcon />}
        color="secondary"
        label={label}
        clickable
        size="medium"
      />
      <Chip
        icon={<InfoIcon />}
        variant="outlined"
        label={label}
        clickable
        size="medium"
      />
    </Stack>
    <br />
    <Stack direction="row" spacing={2} alignItems="center">
      <Chip label={label} clickable size="large" />
      <Chip color="secondary" label={label} clickable size="large" />
      <Chip variant="outlined" label={label} clickable size="large" />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Chip variant="active" label={label} clickable size="large" />
      <Chip
        variant="active"
        color="secondary"
        label={label}
        clickable
        size="large"
      />
      <Chip variant="active" label={label} clickable size="large" />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Chip icon={<InfoIcon />} label={label} clickable size="large" />
      <Chip
        icon={<InfoIcon />}
        color="secondary"
        label={label}
        clickable
        size="large"
      />
      <Chip
        icon={<InfoIcon />}
        variant="outlined"
        label={label}
        clickable
        size="large"
      />
    </Stack>
  </Stack>
);

export const Light = Template.bind({});
Light.args = { themeMode: 'light' };

export const Dark = Template.bind({});
Dark.args = { themeMode: 'dark' };
