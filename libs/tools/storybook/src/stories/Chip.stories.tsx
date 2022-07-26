import { USDT } from '@frontend/shared-icons';
import { Chip as MuiChip, Stack } from '@mui/material';

export default {
  title: 'Theme/Chip',
  component: MuiChip,
};

const label = 'Chip Name';

export const Chip = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiChip label={label} clickable />
      <MuiChip color="secondary" label={label} clickable />
      <MuiChip variant="outlined" label={label} clickable />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiChip variant="active" label={label} clickable />
      <MuiChip variant="active" color="secondary" label={label} clickable />
      <MuiChip variant="active" label={label} clickable />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiChip icon={<USDT />} label={label} clickable />
      <MuiChip icon={<USDT />} color="secondary" label={label} clickable />
      <MuiChip icon={<USDT />} variant="outlined" label={label} clickable />
    </Stack>
    <br />
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiChip label={label} clickable size="medium" />
      <MuiChip color="secondary" label={label} clickable size="medium" />
      <MuiChip variant="outlined" label={label} clickable size="medium" />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiChip variant="active" label={label} clickable size="medium" />
      <MuiChip
        variant="active"
        color="secondary"
        label={label}
        clickable
        size="medium"
      />
      <MuiChip variant="active" label={label} clickable size="medium" />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiChip icon={<USDT />} label={label} clickable size="medium" />
      <MuiChip
        icon={<USDT />}
        color="secondary"
        label={label}
        clickable
        size="medium"
      />
      <MuiChip
        icon={<USDT />}
        variant="outlined"
        label={label}
        clickable
        size="medium"
      />
    </Stack>
    <br />
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiChip label={label} clickable size="large" />
      <MuiChip color="secondary" label={label} clickable size="large" />
      <MuiChip variant="outlined" label={label} clickable size="large" />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiChip variant="active" label={label} clickable size="large" />
      <MuiChip
        variant="active"
        color="secondary"
        label={label}
        clickable
        size="large"
      />
      <MuiChip variant="active" label={label} clickable size="large" />
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiChip icon={<USDT />} label={label} clickable size="large" />
      <MuiChip
        icon={<USDT />}
        color="secondary"
        label={label}
        clickable
        size="large"
      />
      <MuiChip
        icon={<USDT />}
        variant="outlined"
        label={label}
        clickable
        size="large"
      />
    </Stack>
  </Stack>
);
