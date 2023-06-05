import {
  DAI_OPTIMISM,
  optimism,
  SUSD_OPTIMISM,
  USDC_OPTIMISM,
} from '@dhedge/core-ui-kit/const';

import type { PoolConfig } from '@dhedge/core-ui-kit/types';

import type { VaultConfig } from '../../types';

export const USDY_OPTIMISM: PoolConfig = {
  chainId: optimism.id,
  symbol: 'USDy',
  address: '0x1ec50880101022c11530a069690f5446d1464592',
  depositParams: {
    customTokens: [SUSD_OPTIMISM],
  },
  withdrawParams: {
    customTokens: [
      USDC_OPTIMISM,
      {
        ...SUSD_OPTIMISM,
        intermediateToken: USDC_OPTIMISM,
        method: 'withdrawSUSD',
      },
      DAI_OPTIMISM,
    ],
  },
};

export const USDY_OPTIMISM_VAULT: VaultConfig = {
  ...USDY_OPTIMISM,
  primaryColor: '#2775CA',
  description:
    "This USD yield aggregator vault aims to farm Optimism's most lucrative and safe supported stablecoin pool. It will switch farming pools when higher stablecoin yield opportunities arise for long-term performance.",
  strategies: [
    {
      description: 'Vault receives stablecoin deposits.',
    },
    {
      description: 'Deposits are utilized in the active strategy.',
    },
    {
      description: 'Reward yields are auto-compounded.',
    },
    {
      description: 'The strategy is switched when better opportunities arise.',
    },
  ],
};
