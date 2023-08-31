import { useCallback, useState } from 'react';

import { getAnalytics, logEvent } from 'firebase/analytics';
import { createContainer } from 'react-tracked';

import type { initializeApp } from 'firebase/app';
import type { Dispatch, SetStateAction } from 'react';

import type { EventName } from './types';

const loggerStub = () => {
  return;
};

export { WalletAnalyticsProvider as WalletGoogleAnalyticsProvider } from './WalletAnalyticsProvider';

export const {
  Provider: GoogleAnalyticsProvider,
  useTrackedState: useGoogleAnalytics,
} = createContainer<
  ReturnType<typeof getAnalytics>,
  Dispatch<SetStateAction<ReturnType<typeof getAnalytics>>>,
  {
    client?: ReturnType<typeof initializeApp>;
  }
>(({ client }) => {
  const [firebaseAnalytics, setFirebaseAnalytics] = useState<ReturnType<
    typeof getAnalytics
  > | null>(() => (client ? getAnalytics(client) : null));
  return [firebaseAnalytics, setFirebaseAnalytics];
});

export const useLogAnalyticsEvent = () => {
  const analytics = useGoogleAnalytics();

  return useCallback(
    (event: EventName, params?: { [key: string]: unknown }) => {
      if (analytics) {
        return logEvent(analytics, event, params);
      }
      return loggerStub();
    },
    [analytics],
  );
};
