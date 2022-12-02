/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import { createContainer } from 'react-tracked';
import { useEffectOnce } from 'react-use';

import type Plausible from 'plausible-tracker';
import type { Dispatch, SetStateAction } from 'react';

export const { Provider: AnalyticsProvider, useTrackedState: useAnalytics } =
  createContainer<
    ReturnType<typeof Plausible>,
    Dispatch<SetStateAction<ReturnType<typeof Plausible>>>,
    {
      client: ReturnType<typeof Plausible>;
      enableAutoPageviews?: boolean;
      enableAutoOutboundTracking?: boolean;
    }
  >(
    ({
      client,
      enableAutoOutboundTracking = true,
      enableAutoPageviews = true,
    }) => {
      const [plausible, setPlausible] =
        useState<ReturnType<typeof Plausible>>(client);

      useEffectOnce(() => {
        if (enableAutoOutboundTracking) {
          const cleanup = plausible.enableAutoOutboundTracking();
          cleanup();
        }
      });

      useEffectOnce(() => {
        if (enableAutoPageviews) {
          const cleanup = plausible.enableAutoPageviews();
          cleanup();
        }
      });

      return [plausible, setPlausible];
    },
  );
