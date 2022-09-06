import { Alert, AlertTitle, Stack } from '@mui/material';

export default {
  title: 'Theme/Alert',
  component: Alert,
};

const Template = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Stack direction="row" spacing={2} alignItems="center">
      <Alert severity="info" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
      </Alert>
      <Alert severity="error" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
      </Alert>
      <Alert severity="success" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
      </Alert>
      <Alert severity="warning" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
      </Alert>
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Alert severity="info" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
        Content
      </Alert>
      <Alert severity="error" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
        Content
      </Alert>
      <Alert severity="success" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
        Content
      </Alert>
      <Alert severity="warning" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
        Content
      </Alert>
    </Stack>
    <br />
    <Stack direction="row" spacing={2} alignItems="center">
      <Alert variant="filled" severity="info" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
      </Alert>
      <Alert variant="filled" severity="error" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
      </Alert>
      <Alert variant="filled" severity="success" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
      </Alert>
      <Alert variant="filled" severity="warning" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
      </Alert>
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <Alert variant="filled" severity="info" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
        Content
      </Alert>
      <Alert variant="filled" severity="error" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
        Content
      </Alert>
      <Alert variant="filled" severity="success" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
        Content
      </Alert>
      <Alert variant="filled" severity="warning" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
        Content
      </Alert>
    </Stack>
  </Stack>
);

export const Light = Template.bind({});
Light.args = { themeMode: 'light' };

export const Dark = Template.bind({});
Dark.args = { themeMode: 'dark' };
