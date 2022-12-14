import { goerli, mainnet } from 'wagmi/chains';

import { mvusdc3pcv } from './mvusdc3pcv';
import { test } from './test';

import type { Metavault } from './types';

export * from './mvusdc3pcv';
export * from './types';

export const supportedMetavaults: Record<number, Metavault[]> = {
  [mainnet.id]: [mvusdc3pcv[mainnet.id]],
  [goerli.id]: [mvusdc3pcv[goerli.id], test[goerli.id]],
};
