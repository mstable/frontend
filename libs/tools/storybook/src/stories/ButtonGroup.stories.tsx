import { Button, ButtonGroup, Stack } from '@mui/material';

export default {
  title: 'Theme/ButtonGroup',
  component: ButtonGroup,
};

const Template = () => (
  <Stack direction="column" spacing={2} p={2}>
    <ButtonGroup>
      <Button>One</Button>
      <Button>Two</Button>
      <Button className="Mui-selected">Three</Button>
    </ButtonGroup>
    <ButtonGroup disabled>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  </Stack>
);

export const Light = Template.bind({});
Light.args = { themeMode: 'light' };

export const Dark = Template.bind({});
Dark.args = { themeMode: 'dark' };
