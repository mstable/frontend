import { Stack } from '@mui/material';

import { NotificationSnack as Comp } from './index';

import type { Notification } from './index';

export default {
  title: 'Components/NotificationSnack',
  component: Comp,
};

const notification: Notification = {
  id: '1',
  severity: 'info',
  title: 'Notification title',
  message: 'Information',
  createdOn: Date.now(),
  read: false,
  visible: true,
  hideDuration: 2000,
};

export const NotificationSnack = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Comp notification={notification} />
    <Comp
      notification={{
        ...notification,
        severity: 'success',
        message: 'Success',
      }}
    />
    <Comp
      notification={{
        ...notification,
        severity: 'warning',
        message: 'Warning',
      }}
    />
    <Comp
      notification={{
        ...notification,
        severity: 'error',
        message: 'Error',
      }}
    />
  </Stack>
);
