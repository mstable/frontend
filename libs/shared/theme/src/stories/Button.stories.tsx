import { Button as MuiButton, Stack, Typography } from '@mui/material';
import { ArrowRight } from 'phosphor-react';

export default {
  title: 'Theme/Button',
  component: MuiButton,
};

const label = 'Button';

export const Button = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiButton variant="contained" size="small">
        {label}
      </MuiButton>
      <MuiButton variant="contained" size="medium">
        {label}
      </MuiButton>
      <MuiButton variant="contained" size="large">
        {label}
      </MuiButton>
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiButton variant="contained" color="secondary" size="small">
        {label}
      </MuiButton>
      <MuiButton variant="contained" color="secondary" size="medium">
        {label}
      </MuiButton>
      <MuiButton variant="contained" color="secondary" size="large">
        {label}
      </MuiButton>
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiButton variant="text" size="small">
        {label}
      </MuiButton>
      <MuiButton variant="text" size="medium">
        {label}
      </MuiButton>
      <MuiButton variant="text" size="large">
        {label}
      </MuiButton>
    </Stack>
    <MuiButton
      size="large"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <span>2000.00 USDC</span>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography>Deposit</Typography>
        <ArrowRight size={16} />
      </Stack>
    </MuiButton>
  </Stack>
);
