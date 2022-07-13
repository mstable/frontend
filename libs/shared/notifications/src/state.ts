import { useState } from 'react';

import { createFlagsContainer } from '@frontend/shared-utils';
import { createContainer } from 'react-tracked';

import type { Notification } from '@frontend/shared-ui';
import type { Dispatch, SetStateAction } from 'react';
export type Flag = 'notifications_center';

type NotificationsState = {
  notifications: Notification[];
  maxVisible: number;
  autoHideDuration: number | null;
};

export const { FlagsProvider, useFlags, useSetFlag, useClearFlag } =
  createFlagsContainer<Flag>({
    notifications_center: false,
  });

export const { Provider, useSelector, useUpdate, useTrackedState } =
  createContainer<
    NotificationsState,
    Dispatch<SetStateAction<NotificationsState>>,
    { initialState: NotificationsState }
  >(({ initialState }) => useState(initialState));
