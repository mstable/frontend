import { MHRVST_OPTIMISM, MHRVST_OPTIMISM_VAULT } from './optimism/mhrvst';

import type { TradingPanelContextConfig } from '@dhedge/core-ui-kit/types';

import type { VaultConfig } from '../types';

export const CORE_UI_TOOLKIT_POOL_CONFIG_MAP: TradingPanelContextConfig['poolConfigMap'] =
  {
    [MHRVST_OPTIMISM.address]: MHRVST_OPTIMISM,
  };

export const VAULT_CONFIG_MAP: Record<VaultConfig['address'], VaultConfig> = {
  [MHRVST_OPTIMISM.address]: MHRVST_OPTIMISM_VAULT,
};

export const VAULT_CONFIGS = Object.values(VAULT_CONFIG_MAP);

export const CORE_VAULT_NETWORK_CONFIG_MAP = Object.values(
  VAULT_CONFIG_MAP,
).reduce<Record<VaultConfig['chainId'], VaultConfig[]>>((acc, config) => {
  acc[config.chainId] = [...(acc[config.chainId] ?? []), config];
  return acc;
}, {});

export const DEPOSIT_QUOTE_DIFF_ERROR_THRESHOLD = 3;
