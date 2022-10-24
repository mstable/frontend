import { chainId } from 'wagmi';

import { mvusdc3pcv } from './mvusdc3pcv';
import { test } from './test';

import type { Metavault, SupportedMetavault } from './types';

export * from './mvusdc3pcv';
export * from './types';

export const supportedMetavaults: Record<
  number,
  Record<SupportedMetavault, Metavault>
> = {
  [chainId.mainnet]: {
    mvusdc3pcv: mvusdc3pcv[chainId.mainnet],
    test: test[chainId.mainnet],
  },
  [chainId.goerli]: {
    mvusdc3pcv: mvusdc3pcv[chainId.goerli],
    test: test[chainId.goerli],
  },
};
