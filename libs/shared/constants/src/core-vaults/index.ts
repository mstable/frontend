import { ETHY_OPTIMISM, ETHY_OPTIMISM_VAULT } from './optimism/ethy';
import { USDMNY_OPTIMISM, USDMNY_OPTIMISM_VAULT } from './optimism/usdmny';
import { USDY_OPTIMISM, USDY_OPTIMISM_VAULT } from './optimism/usdy';

import type {
  PoolConfig,
  TradingPanelContextConfig,
} from '@dhedge/core-ui-kit/types';

import type { VaultConfig } from '../types';

export const CORE_UI_TOOLKIT_POOL_CONFIG_MAP: TradingPanelContextConfig['poolConfigMap'] =
  {
    [USDY_OPTIMISM.address]: USDY_OPTIMISM,
    [USDMNY_OPTIMISM.address]: USDMNY_OPTIMISM,
    [ETHY_OPTIMISM.address]: ETHY_OPTIMISM,
  };

export const VAULT_CONFIG_MAP: Record<VaultConfig['address'], VaultConfig> = {
  [USDY_OPTIMISM_VAULT.address]: USDY_OPTIMISM_VAULT,
  [USDMNY_OPTIMISM_VAULT.address]: USDMNY_OPTIMISM_VAULT,
  [ETHY_OPTIMISM_VAULT.address]: ETHY_OPTIMISM_VAULT,
};

export const CORE_UI_TOOLKIT_NETWORK_POOL_CONFIG_MAP = Object.values(
  CORE_UI_TOOLKIT_POOL_CONFIG_MAP,
).reduce<Record<PoolConfig['chainId'], PoolConfig[]>>((acc, config) => {
  acc[config.chainId] = [...(acc[config.chainId] ?? []), config];
  return acc;
}, {});

export const CORE_VAULT_NETWORK_CONFIG_MAP = Object.values(
  VAULT_CONFIG_MAP,
).reduce<Record<VaultConfig['chainId'], VaultConfig[]>>((acc, config) => {
  acc[config.chainId] = [...(acc[config.chainId] ?? []), config];
  return acc;
}, {});
