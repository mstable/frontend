import { USDC_OPTIMISM } from '@dhedge/core-ui-kit/const';

import { ZERO_ADDRESS } from '../utils';

import type { TradingToken } from '@dhedge/core-ui-kit/types';
import type { Address } from 'wagmi';

export const FLATCOIN_OPTIMISM = {
  symbol: 'mStable',
  address: ZERO_ADDRESS,
  decimals: 18,
  value: '',
};

export const ETH_OPTIMISM = {
  symbol: 'ETH',
  address: '0x4200000000000000000000000000000000000006' as Address,
  decimals: 18,
  value: '',
};

export const USDC_OPTIMISM_GOERLI: TradingToken = {
  ...USDC_OPTIMISM,
  address: '0xC108c33731a62781579A28F33b0Ce6AF28a090D2',
};

export const FLATCOIN_OPTIMISM_GOERLI: TradingToken = { ...FLATCOIN_OPTIMISM };
export const ETH_OPTIMISM_GOERLI: TradingToken = { ...ETH_OPTIMISM };
