import { SaveABI } from '@frontend/shared-constants';
import { MBTC, MUSD } from '@frontend/shared-icons';
import { mainnet, polygon } from 'wagmi/chains';

import type { Contract } from './types';

export const saves: Contract[] = [
  // {
  //   name: 'mUSD Save',
  //   address: '0x30647a72Dc82d7Fbb1123EA74716aB8A317Eac19',
  //   type: 'save',
  //   icon: MUSD,
  //   abi: SaveABI,
  //   chainId: mainnet.id,
  // },
  {
    name: 'mBTC Save',
    address: '0x17d8CBB6Bce8cEE970a4027d1198F6700A7a6c24',
    type: 'save',
    decimals: 18,
    symbol: 'imBTC',
    icon: MBTC,
    abi: SaveABI,
    chainId: mainnet.id,
    vaultAddress: '0xf38522f63f40f9dd81abafd2b8efc2ec958a3016',
  },
  {
    name: 'mUSD Save',
    address: '0x5290Ad3d83476CA6A2b178Cd9727eE1EF72432af',
    type: 'save',
    decimals: 18,
    symbol: 'imUSD',
    icon: MUSD,
    abi: SaveABI,
    chainId: polygon.id,
  },
];
