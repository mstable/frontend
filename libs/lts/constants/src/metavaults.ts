import { MvUSDC } from '@frontend/shared-icons';
import { mainnet, polygon } from 'wagmi/chains';

import type { Metavault } from './types';

const main: Metavault[] = [
  {
    address: '0x455fb969dc06c4aa77e7db3f0686cc05164436d2',
    name: '3Pool Convex Meta Vault',
    type: 'metavault',
    icon: MvUSDC,
  },
];

export const metavaults = {
  [mainnet.id]: main,
  [polygon.id]: [],
};
