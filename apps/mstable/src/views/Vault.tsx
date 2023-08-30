import { useEffect, useMemo } from 'react';

import { Vault as V } from '@frontend/mstable-vault';
import {
  CORE_UI_TOOLKIT_POOL_CONFIG_MAP,
  VAULT_CONFIG_MAP,
} from '@frontend/shared-constants';
import { useLogAnalyticsEvent } from '@frontend/shared-providers';
import { useMatch } from '@tanstack/react-location';
import { useMount } from 'react-use';

import { useTransitionBackgroundColor } from '../components/Backgrounds';
import { UnsupportedVaultPage } from '../components/Errors';

import type { VaultRoute } from '@frontend/mstable-vault';

export const Vault = () => {
  const logEvent = useLogAnalyticsEvent();
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

  useEffect(() => {
    if (!config?.address) return;
    logEvent('vault_page_view', {
      chainId: config?.chainId,
    });
  }, [config?.address, logEvent, config?.chainId]);

  if (!config) return <UnsupportedVaultPage />;

  return <V config={config} />;
};
