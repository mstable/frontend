import { Avatar, Stack } from '@mui/material';

export default {
  title: 'Theme/Avatar',
  component: Avatar,
};

const Template = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar
        src="https://s.gravatar.com/avatar/c95a3ae80b9b653e4da56ce191836b65?s=16"
        alt="img"
        sx={{ width: 16, height: 16 }}
      />
      <Avatar sx={{ width: 16, height: 16, fontSize: 14 }}>U</Avatar>
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar
        src="https://s.gravatar.com/avatar/c95a3ae80b9b653e4da56ce191836b65?s=24"
        alt="img"
      />
      <Avatar>U</Avatar>
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar
        src="https://s.gravatar.com/avatar/c95a3ae80b9b653e4da56ce191836b65?s=56"
        alt="img"
        sx={{ width: 56, height: 56 }}
      />
      <Avatar sx={{ width: 56, height: 56, fontSize: 36 }}>U</Avatar>
    </Stack>
  </Stack>
);

export const Light = Template.bind({});
Light.args = { themeMode: 'light' };

export const Dark = Template.bind({});
Dark.args = { themeMode: 'dark' };
