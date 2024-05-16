import { optimism } from '@dhedge/core-ui-kit/const';

import { USDC_OPTIMISM } from '../../tokens';

import type { PoolConfig } from '@dhedge/core-ui-kit/types';

import type { VaultConfig } from '../../types';

export const MHRVST_OPTIMISM: PoolConfig = {
  chainId: optimism.id,
  symbol: 'mHRVST',
  address: '0x9c6de13d4648a6789017641f6b1a025816e66228',
  depositParams: {
    customTokens: [],
  },
  withdrawParams: {
    customTokens: [USDC_OPTIMISM],
  },
};

export const MHRVST_OPTIMISM_VAULT: VaultConfig = {
  ...MHRVST_OPTIMISM,
  primaryColor: '#2775CA',
  description:
    'This vault intelligently reallocates liquidity among safe strategies to secure maximum returns. The Meta Harvester chooses the best yield from multiple sub-vaults, including Stablecoin Yield Vault, USD Delta Neutral Vault, and Perpetual Delta Neutral Vault. Meta Harvester eliminates the need for manual intervention, ensuring effortless transitions between strategies, delivering efficient yield farming.',
  // descriptionLink: '', // TODO: add link to docs or post
  featured: true,
  strategies: [
    {
      description:
        'Allocates funds among its sub-vaults, including Stablecoin Yield Vault, USD Delta Neutral Vault, and Perpetual Delta Neutral Vault, based on the best Annual Percentage Yield (APY) offered by each sub-vault.',
    },
    {
      description:
        'The sub-vaults execute specific strategies such as leveraging stablecoins and DEXs, employing Delta Neutral techniques, and capitalizing on perpetual futures to generate maximum yield.',
    },
    {
      description:
        'Continuously evaluates market conditions, rebalances the allocation of funds between sub-vaults, and adjusts strategies to optimize returns.',
    },
  ],
  minWithdrawalUsd: 100,
};
