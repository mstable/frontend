import { useMemo } from 'react';

import { Vault as V } from '@frontend/mstable-vault';
import {
  CORE_UI_TOOLKIT_POOL_CONFIG_MAP,
  VAULT_CONFIG_MAP,
} from '@frontend/shared-constants';
import { useMatch } from '@tanstack/react-location';
import { useMount } from 'react-use';

import { useTransitionBackgroundColor } from '../components/Backgrounds';
import { UnsupportedVaultPage } from '../components/Errors';

import type { VaultRoute } from '@frontend/mstable-vault';

export const Vault = () => {
  const updateBkgColor = useTransitionBackgroundColor();
  const {
    params: { address },
  } = useMatch<VaultRoute>();
  const { config, vault } = useMemo(
    () => ({
      config: CORE_UI_TOOLKIT_POOL_CONFIG_MAP[address.toLowerCase()],
      vault: VAULT_CONFIG_MAP[address.toLowerCase()],
    }),
    [address],
  );

  useMount(() => {
    if (vault) {
      updateBkgColor(vault.primaryColor);
    }
  });

  if (!config) return <UnsupportedVaultPage />;

  return <V config={config} />;
};
