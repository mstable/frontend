import { Avatar as MuiAvatar, Stack } from '@mui/material';

export default {
  title: 'Theme/Avatar',
  component: MuiAvatar,
};

export const Avatar = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiAvatar
        src="https://s.gravatar.com/avatar/c95a3ae80b9b653e4da56ce191836b65?s=16"
        alt="img"
        sx={{ width: 16, height: 16 }}
      />
      <MuiAvatar sx={{ width: 16, height: 16, fontSize: 14 }}>U</MuiAvatar>
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiAvatar
        src="https://s.gravatar.com/avatar/c95a3ae80b9b653e4da56ce191836b65?s=24"
        alt="img"
      />
      <MuiAvatar>U</MuiAvatar>
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiAvatar
        src="https://s.gravatar.com/avatar/c95a3ae80b9b653e4da56ce191836b65?s=56"
        alt="img"
        sx={{ width: 56, height: 56 }}
      />
      <MuiAvatar sx={{ width: 56, height: 56, fontSize: 36 }}>U</MuiAvatar>
    </Stack>
  </Stack>
);
