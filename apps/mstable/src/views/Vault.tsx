import { useMemo } from 'react';

import { Vault as V } from '@frontend/mstable-vault';
import { CORE_UI_TOOLKIT_POOL_CONFIG_MAP } from '@frontend/shared-constants';
import { useMatch } from '@tanstack/react-location';

import { UnsupportedMvPage } from '../components/Errors';

import type { VaultRoute } from '@frontend/mstable-vault';

export const Vault = () => {
  const {
    params: { address },
  } = useMatch<VaultRoute>();
  const config = useMemo(
    () => CORE_UI_TOOLKIT_POOL_CONFIG_MAP[address.toLowerCase()],
    [address],
  );

  if (!config) return <UnsupportedMvPage />;

  return <V config={config} />;
};
