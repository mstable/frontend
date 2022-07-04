import { useCallback, useState } from 'react';

import { mergeDeepRight } from 'ramda';
import { createContainer } from 'react-tracked';

import type { Dispatch, SetStateAction } from 'react';

import type { RecursivePartial, WithChildren } from './types';

export type WithDefaults<T> = T & { _defaults: T };

export const createDefaultsContainer = <T extends object>(initialState: T) => {
  const { Provider, useTrackedState, useUpdate } = createContainer<
    WithDefaults<T>,
    Dispatch<SetStateAction<WithDefaults<T>>>,
    WithChildren<{ initialState?: RecursivePartial<T> }>
  >(({ initialState: providerInitialState }) =>
    useState({
      _defaults: mergeDeepRight(initialState, providerInitialState ?? {}) as T,
      ...(mergeDeepRight(initialState, providerInitialState ?? {}) as T),
    }),
  );

  const useGetState = () => {
    const { _defaults: defaults, ...state } = useTrackedState();

    return state as T;
  };

  const useUpdateState = () => {
    const update = useUpdate();

    return useCallback(
      (newState: T) => {
        update((state) => ({ _defaults: state._defaults, ...newState }));
      },
      [update],
    );
  };

  const useUpdateWithDefaults = () => {
    const update = useUpdate();

    return useCallback(
      (newState?: RecursivePartial<T>) => {
        update((state) => ({
          _defaults: state._defaults,
          ...(mergeDeepRight(state._defaults, newState ?? {}) as T),
        }));
      },
      [update],
    );
  };

  const useReset = () => {
    const update = useUpdate();

    return useCallback(() => {
      update((state) => ({ _defaults: state._defaults, ...state._defaults }));
    }, [update]);
  };

  return {
    DefaultsProvider: Provider,
    useWithDefaults: [useGetState, useUpdateWithDefaults, useUpdateState],
    useState: useGetState,
    useUpdate: useUpdateState,
    useUpdateWithDefaults,
    useReset,
  };
};
