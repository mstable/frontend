import { chainId } from 'wagmi';

import { mvusdc3pcv } from './mvusdc3pcv';
import { test } from './test';

import type { Metavault } from './types';

export * from './mvusdc3pcv';
export * from './types';

export const supportedMetavaults: Record<number, Metavault[]> = {
  [chainId.mainnet]: [mvusdc3pcv[chainId.mainnet], test[chainId.mainnet]],
  [chainId.goerli]: [mvusdc3pcv[chainId.goerli], test[chainId.goerli]],
};
