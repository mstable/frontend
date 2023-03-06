import { FeederPoolABI } from '@frontend/shared-constants';
import { MBTC, MUSD } from '@frontend/shared-icons';
import { mainnet, polygon } from 'wagmi/chains';

import type { Pool } from './types';

export const main: Pool[] = [
  {
    name: 'mUSD/BUSD',
    address: '0xfE842e95f8911dcc21c943a1dAA4bd641a1381c6',
    type: 'pool',
    icon: MUSD,
    abi: FeederPoolABI,
  },
  {
    name: 'mUSD/alUSD',
    address: '0x4eaa01974B6594C0Ee62fFd7FEE56CF11E6af936',
    type: 'pool',
    icon: MUSD,
    abi: FeederPoolABI,
  },
  {
    name: 'mUSD/FEI',
    address: '0x2F1423D27f9B20058d9D1843E342726fDF985Eb4',
    type: 'pool',
    icon: MUSD,
    abi: FeederPoolABI,
  },
  {
    name: 'mUSD/GUSD',
    address: '0x4fB30C5A3aC8e85bC32785518633303C4590752d',
    type: 'pool',
    icon: MUSD,
    abi: FeederPoolABI,
  },
  {
    name: 'mUSD/RAI',
    address: '0x36F944B7312EAc89381BD78326Df9C84691D8A5B',
    type: 'pool',
    icon: MUSD,
    abi: FeederPoolABI,
  },
  {
    name: 'mBTC/HBTC',
    address: '0x48c59199Da51B7E30Ea200a74Ea07974e62C4bA7',
    type: 'pool',
    abi: FeederPoolABI,
    icon: MBTC,
  },
  {
    name: 'mBTC/TBTC',
    address: '0xb61A6F928B3f069A68469DDb670F20eEeB4921e0',
    type: 'pool',
    abi: FeederPoolABI,
    icon: MBTC,
  },
  {
    name: 'mBTC/tBTCv2',
    address: '0xc3280306b6218031E61752d060b091278d45c329',
    type: 'pool',
    abi: FeederPoolABI,
    icon: MBTC,
  },
];

const poly: Pool[] = [
  {
    name: 'mUSD/FRAX',
    address: '0xb30a907084ac8a0d25dddab4e364827406fd09f0',
    type: 'pool',
    abi: FeederPoolABI,
    icon: MBTC,
  },
];

export const pools = { [mainnet.id]: main, [polygon.id]: poly };
