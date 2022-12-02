import { useCallback } from 'react';

import { goals } from './constants';
import { useAnalytics } from './state';

import type { EventOptions, PlausibleOptions } from 'plausible-tracker';

import type { Goal } from './types';

export const useTrack = () => {
  const { trackEvent } = useAnalytics();

  return useCallback(
    (goal: Goal, props?: EventOptions['props'], options?: PlausibleOptions) => {
      trackEvent(goals[goal], { props: { ...props, timestamp: Date.now() } });
    },
    [trackEvent],
  );
};
