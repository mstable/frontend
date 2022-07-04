import { useCallback, useState } from 'react';

import produce from 'immer';
import { createContainer } from 'react-tracked';

import type { Dispatch, SetStateAction } from 'react';

import type { WithChildren } from './types';

export type LoadersState = Record<string, boolean>;

export const createLoadersContainer = (initialState?: LoadersState) => {
  const { Provider, useTrackedState, useUpdate } = createContainer<
    LoadersState,
    Dispatch<SetStateAction<LoadersState>>,
    WithChildren<{
      initialState?: Partial<LoadersState>;
    }>
  >(({ initialState: providerInitialState }) =>
    useState({ ...initialState, ...providerInitialState }),
  );

  const useIsLoading = () => {
    const state = useTrackedState();

    return Object.values(state).reduce((acc, curr) => acc || curr, false);
  };

  const useSetLoader = () => {
    const update = useUpdate();

    return useCallback(
      (id: string) => {
        update(
          produce((draft) => {
            draft[id] = true;
          }),
        );
      },
      [update],
    );
  };

  const useClearLoader = () => {
    const update = useUpdate();

    return useCallback(
      (id: string) => {
        update(
          produce((draft) => {
            draft[id] = false;
          }),
        );
      },
      [update],
    );
  };

  const useClearAllLoaders = () => {
    const update = useUpdate();

    return useCallback(() => {
      update({});
    }, [update]);
  };

  return {
    LoadersProvider: Provider,
    useLoadersState: [
      useIsLoading,
      useSetLoader,
      useClearLoader,
      useClearAllLoaders,
    ],
    useIsLoading,
    useSetLoader,
    useClearLoader,
    useClearAllLoaders,
  };
};
