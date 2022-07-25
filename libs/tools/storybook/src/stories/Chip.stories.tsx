import { Chip as MuiChip, Stack } from '@mui/material';

export default {
  title: 'Theme/Chip',
  component: MuiChip,
};

const label = 'Chip';

export const Chip = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiChip label={label} clickable />
      <MuiChip color="secondary" label={label} clickable />
      <MuiChip variant="outlined" label={label} clickable />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiChip variant="active" label={label} />
      <MuiChip variant="active" color="secondary" label={label} />
      <MuiChip variant="active" label={label} />
    </Stack>
  </Stack>
);
