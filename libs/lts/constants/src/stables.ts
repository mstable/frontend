import { StableABI } from '@frontend/shared-constants';
import { MBTC, MUSD } from '@frontend/shared-icons';
import { mainnet, polygon } from 'wagmi/chains';

import type { Contract } from './types';

const main: Contract[] = [
  {
    name: 'mUSD',
    address: '0xe2f2a5C287993345a840Db3B0845fbC70f5935a5',
    type: 'stable',
    abi: StableABI,
    icon: MUSD,
  },
  {
    name: 'mBTC',
    address: '0x945Facb997494CC2570096c74b5F66A3507330a1',
    type: 'stable',
    abi: StableABI,
    icon: MBTC,
  },
];
const poly: Contract[] = [
  {
    name: 'mUSD',
    address: '0x5290Ad3d83476CA6A2b178Cd9727eE1EF72432af',
    type: 'save',
    icon: MUSD,
    abi: StableABI,
  },
];

export const stables = { [mainnet.id]: main, [polygon.id]: poly };
