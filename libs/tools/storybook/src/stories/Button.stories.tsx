import { Button, Stack } from '@mui/material';

export default {
  title: 'Theme/Button',
  component: Button,
};

const label = 'Button';

const Template = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Stack direction="row" spacing={2} alignItems="center">
      <Button variant="contained" size="small">
        {label}
      </Button>
      <Button variant="contained" size="medium">
        {label}
      </Button>
      <Button variant="contained" size="large">
        {label}
      </Button>
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Button variant="contained" size="small" disabled>
        {label}
      </Button>
      <Button variant="contained" size="medium" disabled>
        {label}
      </Button>
      <Button variant="contained" size="large" disabled>
        {label}
      </Button>
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Button variant="contained" color="secondary" size="small">
        {label}
      </Button>
      <Button variant="contained" color="secondary" size="medium">
        {label}
      </Button>
      <Button variant="contained" color="secondary" size="large">
        {label}
      </Button>
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Button variant="contained" color="secondary" size="small" disabled>
        {label}
      </Button>
      <Button variant="contained" color="secondary" size="medium" disabled>
        {label}
      </Button>
      <Button variant="contained" color="secondary" size="large" disabled>
        {label}
      </Button>
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Button variant="text" size="small">
        {label}
      </Button>
      <Button variant="text" size="medium">
        {label}
      </Button>
      <Button variant="text" size="large">
        {label}
      </Button>
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Button variant="text" size="small" disabled>
        {label}
      </Button>
      <Button variant="text" size="medium" disabled>
        {label}
      </Button>
      <Button variant="text" size="large" disabled>
        {label}
      </Button>
    </Stack>
  </Stack>
);

export const Light = Template.bind({});
Light.args = { themeMode: 'light' };

export const Dark = Template.bind({});
Dark.args = { themeMode: 'dark' };
