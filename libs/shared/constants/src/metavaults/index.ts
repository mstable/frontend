import { goerli, mainnet } from 'wagmi/chains';

import { mvusdc3pcv } from './mvusdc3pcv';
import { sexyMv } from './sexyMv';

export * from './mvusdc3pcv';
export * from './types';

export const metavaults = {
  [mainnet.id]: [mvusdc3pcv[mainnet.id]],
  [goerli.id]: [mvusdc3pcv[goerli.id], sexyMv[goerli.id]],
};

export const metavaultList = [
  mvusdc3pcv[mainnet.id],
  mvusdc3pcv[goerli.id],
  sexyMv[goerli.id],
];
