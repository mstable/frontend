import { StableABI } from '@frontend/shared-constants';
import { MBTC, MUSD } from '@frontend/shared-icons';
import { mainnet, polygon } from 'wagmi/chains';

import type { Contract } from './types';

export const stables: Contract[] = [
  // {
  //   name: 'mUSD',
  //   address: '0xe2f2a5C287993345a840Db3B0845fbC70f5935a5',
  //   type: 'stable',
  //   abi: StableABI,
  //   chain: mainnet.id,
  //   icon: MUSD,
  // },
  {
    name: 'mBTC',
    address: '0x945Facb997494CC2570096c74b5F66A3507330a1',
    type: 'stable',
    decimals: 18,
    symbol: 'mBTC',
    abi: StableABI,
    chainId: mainnet.id,
    icon: MBTC,
  },
  {
    name: 'mUSD',
    address: '0xE840B73E5287865EEc17d250bFb1536704B43B21',
    type: 'stable',
    decimals: 18,
    symbol: 'mStable USD (Polygon PoS)',
    icon: MUSD,
    abi: StableABI,
    chainId: polygon.id,
  },
];
