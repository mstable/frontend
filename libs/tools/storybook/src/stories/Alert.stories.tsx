import { Alert as MuiAlert, AlertTitle, Stack } from '@mui/material';

export default {
  title: 'Theme/Alert',
  component: MuiAlert,
};

export const Alert = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiAlert severity="info" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
      </MuiAlert>
      <MuiAlert severity="error" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
      </MuiAlert>
      <MuiAlert severity="success" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
      </MuiAlert>
      <MuiAlert severity="warning" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
      </MuiAlert>
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiAlert severity="info" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
        Content
      </MuiAlert>
      <MuiAlert severity="error" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
        Content
      </MuiAlert>
      <MuiAlert severity="success" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
        Content
      </MuiAlert>
      <MuiAlert severity="warning" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
        Content
      </MuiAlert>
    </Stack>
    <br />
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiAlert variant="filled" severity="info" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
      </MuiAlert>
      <MuiAlert variant="filled" severity="error" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
      </MuiAlert>
      <MuiAlert variant="filled" severity="success" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
      </MuiAlert>
      <MuiAlert variant="filled" severity="warning" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
      </MuiAlert>
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
      <MuiAlert variant="filled" severity="info" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
        Content
      </MuiAlert>
      <MuiAlert variant="filled" severity="error" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
        Content
      </MuiAlert>
      <MuiAlert variant="filled" severity="success" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
        Content
      </MuiAlert>
      <MuiAlert variant="filled" severity="warning" onClose={() => {}}>
        <AlertTitle>Title</AlertTitle>
        Content
      </MuiAlert>
    </Stack>
  </Stack>
);
