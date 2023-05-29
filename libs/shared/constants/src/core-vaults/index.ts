import { USDY_OPTIMISM, USDY_OPTIMISM_VAULT } from './optimism/usdy';

import type {
  PoolConfig,
  TradingPanelContextConfig,
} from '@dhedge/core-ui-kit/types';

import type { VaultConfig } from '../types';

export const CORE_UI_TOOLKIT_POOL_CONFIG_MAP: TradingPanelContextConfig['poolConfigMap'] =
  {
    [USDY_OPTIMISM.address]: USDY_OPTIMISM,
  };

export const VAULT_CONFIG_MAP: Record<VaultConfig['address'], VaultConfig> = {
  [USDY_OPTIMISM_VAULT.address]: USDY_OPTIMISM_VAULT,
};

export const CORE_UI_TOOLKIT_NETWORK_POOL_CONFIG_MAP = Object.values(
  CORE_UI_TOOLKIT_POOL_CONFIG_MAP,
).reduce<Record<PoolConfig['chainId'], PoolConfig[]>>((acc, config) => {
  acc[config.chainId] = [...(acc[config.chainId] ?? []), config];
  return acc;
}, {});
