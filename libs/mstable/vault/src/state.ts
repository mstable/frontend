import { useEffect, useState } from 'react';

import { usePoolFees } from '@dhedge/core-ui-kit/hooks/pool';
import { VAULT_CONFIG_MAP } from '@frontend/shared-constants';
import produce from 'immer';
import { createContainer } from 'react-tracked';

import { useFundQuery } from './queries';

import type { PoolConfig } from '@dhedge/core-ui-kit/types';
import type { PoolConfigMeta } from '@frontend/shared-constants';
import type { Dispatch, SetStateAction } from 'react';

import type { Fund } from './types';

type VaultState = {
  fund?: Fund;
  config: PoolConfig;
  meta: PoolConfigMeta;
  fees?: Partial<ReturnType<typeof usePoolFees>>;
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
    meta: VAULT_CONFIG_MAP[initialState.config.address],
    fees: {},
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

  const fees = usePoolFees({
    address: initialState.config.address,
    chainId: initialState.config.chainId,
  });

  useEffect(() => {
    setState(
      produce((draft) => {
        draft.fees = fees;
      }),
    );
  }, [fees]);

  return [state, setState];
});
