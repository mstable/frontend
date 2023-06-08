import {
  optimism,
  SUSD_OPTIMISM,
  USDC_OPTIMISM,
  WETH_OPTIMISM,
} from '@dhedge/core-ui-kit/const';

import type { PoolConfig } from '@dhedge/core-ui-kit/types';

import type { VaultConfig } from '../../types';

export const ETHY_OPTIMISM: PoolConfig = {
  chainId: optimism.id,
  symbol: 'ETHy',
  address: '0xb2cfb909e8657c0ec44d3dd898c1053b87804755',
  depositParams: {
    customTokens: [SUSD_OPTIMISM],
  },
  withdrawParams: {
    customTokens: [
      WETH_OPTIMISM,
      {
        ...SUSD_OPTIMISM,
        intermediateToken: USDC_OPTIMISM,
        method: 'withdrawSUSD',
      },
    ],
  },
};

export const ETHY_OPTIMISM_VAULT: VaultConfig = {
  ...ETHY_OPTIMISM,
  primaryColor: '#2775CA',
  description:
    'Ethereum Long Volatility increases in performance when Ethereum moves up or down sharply but loses performance when Ethereum stays within the same range.',
  strategies: [
    {
      description:
        'ETHv goes up in price when Ethereum either goes up or down in price.',
    },
    {
      description:
        'ETHv has unlimited upside when the Ethereum price is volatile and experiences limited losses when the Ethereum price is not volatile.',
    },
    {
      description:
        'Buys out-of-the-money puts and calls one month before expiry—currently, no adjustments. Options are held until expiry.',
    },
    {
      description: 'Backtesting results.',
    },
  ],
};
