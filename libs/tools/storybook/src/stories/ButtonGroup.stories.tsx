import { Button, ButtonGroup as MuiButtonGroup, Stack } from '@mui/material';

export default {
  title: 'Theme/ButtonGroup',
  component: MuiButtonGroup,
};

export const ButtonGroup = () => (
  <Stack direction="column" spacing={2} p={2}>
    <MuiButtonGroup>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </MuiButtonGroup>
    <MuiButtonGroup color="secondary">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </MuiButtonGroup>
  </Stack>
);
