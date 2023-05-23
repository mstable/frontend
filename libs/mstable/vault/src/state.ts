import { useState } from 'react';

import produce from 'immer';
import { createContainer } from 'react-tracked';

import { useFundQuery } from './queries';

import type { PoolConfig } from '@dhedge/core-ui-kit/types';
import type { Dispatch, SetStateAction } from 'react';

import type { Fund } from './types';

type VaultState = {
  fund?: Fund;
  config: PoolConfig;
};

export const {
  Provider: VaultProvider,
  useUpdate: useUpdateVault,
  useTrackedState: useVault,
} = createContainer<
  VaultState,
  Dispatch<SetStateAction<VaultState>>,
  { initialState: { config: PoolConfig } }
>(({ initialState }) => {
  const [state, setState] = useState<VaultState>({
    config: initialState.config,
    fund: undefined,
  });

  useFundQuery(
    { address: state.config.address },
    {
      onSettled: (data, error) => {
        if (error) {
          return setState(
            produce((draft) => {
              draft.fund = undefined;
            }),
          );
        }

        setState(
          produce((draft) => {
            draft.fund = data.fund;
          }),
        );
      },
    },
  );

  return [state, setState];
});
