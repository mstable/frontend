import { useCallback, useState } from 'react';

import produce from 'immer';
import { createContainer } from 'react-tracked';

import type { Dispatch, SetStateAction } from 'react';

import type { WithChildren } from './types';

export type FlagsState<F extends string> = Record<F, boolean>;

export const createFlagsContainer = <F extends string>(
  initialState: FlagsState<F>,
) => {
  const { Provider, useTrackedState, useUpdate } = createContainer<
    FlagsState<F>,
    Dispatch<SetStateAction<FlagsState<F>>>,
    WithChildren<{
      initialState?: Partial<FlagsState<F>>;
    }>
  >(({ initialState: providerInitialState }) =>
    useState({ ...initialState, ...providerInitialState }),
  );

  const useSetFlag = () => {
    const update = useUpdate();
    return useCallback(
      (flag: F) => {
        update(
          produce((draft) => {
            draft[flag] = true;
          }),
        );
      },
      [update],
    );
  };

  const useClearFlag = () => {
    const update = useUpdate();
    return useCallback(
      (flag: F) => {
        update(
          produce((draft) => {
            draft[flag] = false;
          }),
        );
      },
      [update],
    );
  };

  const useToggleFlag = () => {
    const update = useUpdate();
    return useCallback(
      (flag: F) => {
        update(
          produce((draft) => {
            draft[flag] = !draft[flag];
          }),
        );
      },
      [update],
    );
  };

  const useSetAllFlags = () => {
    const update = useUpdate();
    return useCallback(
      (value: boolean) => {
        update(
          (state) =>
            Object.fromEntries(
              Object.keys(state).map((key) => [key, value]),
            ) as FlagsState<F>,
        );
      },
      [update],
    );
  };

  const useReset = () => {
    const update = useUpdate();
    return useCallback(() => {
      update(initialState);
    }, [update]);
  };

  return {
    FlagsProvider: Provider,
    useFlagsState: [useTrackedState, useSetFlag, useClearFlag, useToggleFlag],
    useFlags: useTrackedState,
    useSetFlag,
    useClearFlag,
    useToggleFlag,
    useSetAllFlags,
    useReset,
  };
};
