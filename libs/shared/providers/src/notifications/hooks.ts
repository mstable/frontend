import { useCallback } from 'react';

import produce from 'immer';
import { propEq } from 'ramda';

import { useSelector, useUpdate } from './state';

import type { AlertColor } from '@mui/material';
import type { ReactNode } from 'react';

type NotificationOptions = {
  id?: string;
  severity?: AlertColor;
  title: string;
  message?: string;
  content?: ReactNode;
  visible?: boolean;
  hideDuration?: number | null;
};

export const usePushNotification = () => {
  const update = useUpdate();

  return useCallback(
    (options: NotificationOptions) => {
      update(
        produce((state) => {
          state.notifications.unshift({
            severity: 'info',
            visible: true,
            hideDuration: state.autoHideDuration,
            id: Date.now().toString(),
            ...options,
            createdOn: Date.now(),
            read: false,
          });
        }),
      );
    },
    [update],
  );
};

export const useSetNotificationInvisible = () => {
  const update = useUpdate();

  return useCallback(
    (id: string) => {
      update(
        produce((state) => {
          const idx = state.notifications.findIndex(propEq(id, 'id'));
          if (idx > -1) {
            state.notifications[idx].visible = false;
          }
        }),
      );
    },
    [update],
  );
};

export const useSetNotificationRead = () => {
  const update = useUpdate();

  return useCallback(
    (id: string) => {
      update(
        produce((state) => {
          const idx = state.notifications.findIndex(propEq(id, 'id'));
          if (idx > -1) {
            state.notifications[idx].read = true;
          }
        }),
      );
    },
    [update],
  );
};

export const useMarkAllNotificationsAsRead = () => {
  const update = useUpdate();

  return useCallback(() => {
    update(
      produce((state) => {
        state.notifications.forEach(
          (notification) => (notification.read = true),
        );
      }),
    );
  }, [update]);
};

export const useDeleteNotification = () => {
  const update = useUpdate();

  return useCallback(
    (id: string) => {
      update(
        produce((state) => {
          const idx = state.notifications.findIndex(propEq(id, 'id'));
          if (idx > -1) {
            state.notifications.splice(idx, 1);
          }
        }),
      );
    },
    [update],
  );
};

export const useClearAllNotifications = () => {
  const update = useUpdate();

  return useCallback(() => {
    update(
      produce((state) => {
        state.notifications = [];
      }),
    );
  }, [update]);
};

export const useUnreadNotificationsCount = () =>
  useSelector((state) =>
    state.notifications.reduce((acc, curr) => acc + (curr.read ? 0 : 1), 0),
  );
