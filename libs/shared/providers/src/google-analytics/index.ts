import { useCallback, useState } from 'react';

import { getAnalytics, logEvent } from 'firebase/analytics';
import { createContainer } from 'react-tracked';

import type { initializeApp } from 'firebase/app';
import type { Dispatch, SetStateAction } from 'react';

import type { EventName } from './types';

export const {
  Provider: GoogleAnalyticsProvider,
  useTrackedState: useGoogleAnalytics,
} = createContainer<
  ReturnType<typeof getAnalytics>,
  Dispatch<SetStateAction<ReturnType<typeof getAnalytics>>>,
  {
    client: ReturnType<typeof initializeApp>;
  }
>(({ client }) => {
  const [firebaseAnalytics, setFirebaseAnalytics] = useState<
    ReturnType<typeof getAnalytics>
  >(() => getAnalytics(client));

  return [firebaseAnalytics, setFirebaseAnalytics];
});

export const useLogAnalyticsEvent = () => {
  const analytics = useGoogleAnalytics();

  return useCallback(
    ({
      event,
      params,
    }: {
      event: EventName;
      params?: { [key: string]: unknown };
    }) => {
      return logEvent(analytics, event, params);
    },
    [analytics],
  );
};
