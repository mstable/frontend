import { useMemo } from 'react';

import { NotificationSnack } from '@frontend/shared-ui';
import { isNilOrEmpty } from '@frontend/shared-utils';
import { Stack } from '@mui/material';
import { descend, prop, propEq, take } from 'ramda';

import { useSetNotificationInvisible, useSetNotificationRead } from '../hooks';
import { FlagsProvider, Provider, useTrackedState } from '../state';

import type { WithRequiredChildren } from '@frontend/shared-utils';
import type { StackProps } from '@mui/material';

export type NotificationsProviderProps = WithRequiredChildren<{
  maxVisible?: number;
  autoHideDuration?: number;
  containerProps?: StackProps;
}>;

const NotificationsWrapped = ({
  children,
  sx,
  ...rest
}: WithRequiredChildren<StackProps>) => {
  const { notifications, maxVisible } = useTrackedState();
  const setNotificationAsRead = useSetNotificationRead();
  const setNotificationInvisible = useSetNotificationInvisible();
  const visibleNotifications = useMemo(
    () =>
      take(
        maxVisible,
        notifications
          .filter(propEq('visible', true))
          .sort(descend(prop('createdOn'))),
      ),
    [maxVisible, notifications],
  );

  const handleCloseNotification = (id: string) => () => {
    setNotificationAsRead(id);
    setNotificationInvisible(id);
  };

  const handleAutoHideNotification = (id: string) => () => {
    setNotificationInvisible(id);
  };

  return (
    <>
      {children}
      {!isNilOrEmpty(visibleNotifications) && (
        <Stack
          direction="column"
          spacing={1}
          sx={{
            position: 'fixed',
            top: (theme) => theme.spacing(10),
            right: (theme) => theme.spacing(2),
            zIndex: (theme) => theme.zIndex.drawer + 1,
            ...sx,
          }}
          {...rest}
        >
          {visibleNotifications.map((notif) => (
            <NotificationSnack
              key={notif.id}
              notification={notif}
              onClose={handleCloseNotification(notif.id)}
              onAutoHide={handleAutoHideNotification(notif.id)}
            />
          ))}
        </Stack>
      )}
    </>
  );
};

export const NotificationsProvider = ({
  maxVisible = 4,
  autoHideDuration = 7000,
  containerProps,
  children,
}: NotificationsProviderProps) => (
  <FlagsProvider>
    <Provider
      initialState={{ notifications: [], maxVisible, autoHideDuration }}
    >
      <NotificationsWrapped {...containerProps}>
        {children}
      </NotificationsWrapped>
    </Provider>
  </FlagsProvider>
);
