import { chainId } from 'wagmi';

import { test } from './test';
import { usdc3crv } from './usdc3crv';

import type { Metavault, SupportedMetavault } from './types';

export * from './usdc3crv';
export * from './types';

export const supportedMetavaults: Record<
  number,
  Record<SupportedMetavault, Metavault>
> = {
  [chainId.mainnet]: {
    usdc3crv: usdc3crv[chainId.mainnet],
    test: test[chainId.mainnet],
  },
  [chainId.goerli]: {
    usdc3crv: usdc3crv[chainId.goerli],
    test: test[chainId.goerli],
  },
};
