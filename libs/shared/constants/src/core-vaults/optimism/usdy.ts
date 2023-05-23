import {
  DAI_OPTIMISM,
  optimism,
  SUSD_OPTIMISM,
  USDC_OPTIMISM,
} from '@dhedge/core-ui-kit/const';

import type { PoolConfig } from '@dhedge/core-ui-kit/types';

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
