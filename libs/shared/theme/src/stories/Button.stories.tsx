import { Button as MuiButton, Stack } from '@mui/material';

export default {
  title: 'Theme/Button',
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
  </Stack>
);
