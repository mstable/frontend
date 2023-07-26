import { optimism, USDC_OPTIMISM } from '@dhedge/core-ui-kit/const';

import type { PoolConfig } from '@dhedge/core-ui-kit/types';

import type { VaultConfig } from '../../types';

export const MHRVST_OPTIMISM: PoolConfig = {
  chainId: optimism.id,
  symbol: 'mHRVST',
  address: '0x9c6de13d4648a6789017641f6b1a025816e66228',
  depositParams: {
    customTokens: [USDC_OPTIMISM],
  },
  withdrawParams: {
    customTokens: [USDC_OPTIMISM],
  },
};

export const MHRVST_OPTIMISM_VAULT: VaultConfig = {
  ...MHRVST_OPTIMISM,
  primaryColor: '#2775CA',
  description:
    'This vault goes beyond the ordinary, intelligently reallocating liquidity among strategies to secure maximum returns. With its three sub-vaults, including Stablecoin Yield Vault, USD Delta Neutral Vault, and Perpetual Delta Neutral Vault. It employs sophisticated risk strategies to generate yield based on USD value. Powered by cutting-edge automation, Meta Harvester eliminates the need for manual intervention, ensuring effortless transitions between strategies and pioneering the next phase of efficient yield farming.',
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
