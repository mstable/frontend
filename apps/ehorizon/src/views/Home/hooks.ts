import { useCallback } from 'react';

import { useUpdate } from './state';
import { getRandomDataSet } from './utils';

export const useAddDataSet = () => {
  const update = useUpdate();

  return useCallback(() => {
    update((state) =>
      state.length < 10 ? [...state, getRandomDataSet()] : state,
    );
  }, [update]);
};

export const useRemoveDataSet = () => {
  const update = useUpdate();

  return useCallback(() => {
    update((state) => state.slice(0, -1));
  }, [update]);
};

export const useRefresh = () => {
  const update = useUpdate();

  return () => {
    update((state) => state.map(getRandomDataSet));
  };
};
