import {
  optimism,
  SUSD_OPTIMISM,
  USDC_OPTIMISM,
} from '@dhedge/core-ui-kit/const';

import type { PoolConfig } from '@dhedge/core-ui-kit/types';

import type { VaultConfig } from '../../types';

export const USDMNY_OPTIMISM: PoolConfig = {
  chainId: optimism.id,
  symbol: 'USDmny',
  address: '0x49bf093277bf4dde49c48c6aa55a3bda3eedef68',
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
    ],
  },
};

export const USDMNY_OPTIMISM_VAULT: VaultConfig = {
  ...USDMNY_OPTIMISM,
  description:
    'This vault earns yield on crypto assets while hedging against to be market neutral, making interest on USD while uninfluenced by crypto price volatility.',
  strategies: [
    {
      description:
        'This strategy earns yield on USD by having exposure to and hedging against crypto assets.',
    },
    {
      description:
        'Assets are borrowed from Aave and used to earn yield. The yield on USD is the difference between asset yield and debt yield.',
    },
    {
      description:
        'Assets are hedged to be market-neutral, removing exposure to price volatility.',
    },
    {
      description:
        'Positions and debt rebalance depending on market volatility.',
    },
  ],
};
