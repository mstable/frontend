import { SaveABI } from '@frontend/shared-constants';
import { MBTC, MUSD } from '@frontend/shared-icons';
import { mainnet, polygon } from 'wagmi/chains';

import type { Contract } from './types';

const main: Contract[] = [
  // {
  //   name: 'mUSD',
  //   address: '0xe2f2a5C287993345a840Db3B0845fbC70f5935a5',
  //   type: 'save',
  //   icon: MUSD,
  // },
  // {
  //   name: 'mBTC',
  //   address: '0x945Facb997494CC2570096c74b5F66A3507330a1',
  //   type: 'save',
  //   icon: MBTC,
  // },
  {
    name: 'mUSD Save',
    address: '0x30647a72Dc82d7Fbb1123EA74716aB8A317Eac19',
    type: 'save',
    icon: MUSD,
    abi: SaveABI,
  },
  {
    name: 'mBTC Save',
    address: '0x17d8CBB6Bce8cEE970a4027d1198F6700A7a6c24',
    type: 'save',
    icon: MBTC,
    abi: SaveABI,
  },
];

const poly: Contract[] = [
  {
    name: 'mUSD',
    address: '0x5290Ad3d83476CA6A2b178Cd9727eE1EF72432af',
    type: 'save',
    icon: MUSD,
    abi: SaveABI,
  },
];

export const saves = { [mainnet.id]: main, [polygon.id]: poly };
