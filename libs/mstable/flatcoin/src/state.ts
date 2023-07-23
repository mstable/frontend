import { useCallback, useState } from 'react';

import { createContainer } from 'react-tracked';

import type { Dispatch, SetStateAction } from 'react';

import type { FlatcoinPageState, FlatcoinTradingPanelType } from './types';

const initialState: FlatcoinPageState = {
  type: 'stable',
};

export const {
  Provider: FlatcoinPageProvider,
  useUpdate: useUpdateFlatcoinPageState,
  useTrackedState: useFlatcoinPageState,
} = createContainer<
  FlatcoinPageState,
  Dispatch<SetStateAction<FlatcoinPageState>>,
  unknown
>(() => {
  const [state, setState] = useState<FlatcoinPageState>(initialState);

  return [state, setState];
});

export const useUpdateTradingType = () => {
  const updateState = useUpdateFlatcoinPageState();
  return useCallback(
    (type: FlatcoinTradingPanelType) =>
      updateState((prevState) => ({ ...prevState, type })),
    [],
  );
};
