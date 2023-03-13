import { FeederPoolABI } from '@frontend/shared-constants';
import { MBTC, MUSD } from '@frontend/shared-icons';
import { mainnet, polygon } from 'wagmi/chains';

import type { Contract } from './types';

export const pools: Contract[] = [
  {
    name: 'mUSD/BUSD',
    address: '0xfE842e95f8911dcc21c943a1dAA4bd641a1381c6',
    type: 'pool',
    icon: MUSD,
    abi: FeederPoolABI,
    chain: mainnet.id,
    vaultAddress: '0xd124b55f70d374f58455c8aedf308e52cf2a6207',
  },
  {
    name: 'mUSD/alUSD',
    address: '0x4eaa01974B6594C0Ee62fFd7FEE56CF11E6af936',
    type: 'pool',
    icon: MUSD,
    abi: FeederPoolABI,
    chain: mainnet.id,
    vaultAddress: '0x0997dddc038c8a958a3a3d00425c16f8eca87deb',
  },
  {
    name: 'mUSD/FEI',
    address: '0x2F1423D27f9B20058d9D1843E342726fDF985Eb4',
    type: 'pool',
    icon: MUSD,
    abi: FeederPoolABI,
    chain: mainnet.id,
    vaultAddress: '0xd24099eb4cd604198071958655e4f2d263a5539b',
  },
  {
    name: 'mUSD/GUSD',
    address: '0x4fB30C5A3aC8e85bC32785518633303C4590752d',
    type: 'pool',
    icon: MUSD,
    abi: FeederPoolABI,
    chain: mainnet.id,
    vaultAddress: '0xadeedd3e5768f7882572ad91065f93ba88343c99',
  },
  {
    name: 'mUSD/RAI',
    address: '0x36F944B7312EAc89381BD78326Df9C84691D8A5B',
    type: 'pool',
    icon: MUSD,
    abi: FeederPoolABI,
    chain: mainnet.id,
    vaultAddress: '0xf93e0dde0f7c48108abbd880db7697a86169f13b',
  },
  {
    name: 'mBTC/HBTC',
    address: '0x48c59199Da51B7E30Ea200a74Ea07974e62C4bA7',
    type: 'pool',
    abi: FeederPoolABI,
    chain: mainnet.id,
    icon: MBTC,
    vaultAddress: '0xF65D53AA6e2E4A5f4F026e73cb3e22C22D75E35C',
  },
  {
    name: 'mBTC/TBTC',
    address: '0xb61A6F928B3f069A68469DDb670F20eEeB4921e0',
    type: 'pool',
    abi: FeederPoolABI,
    chain: mainnet.id,
    icon: MBTC,
    vaultAddress: '0x760ea8CfDcC4e78d8b9cA3088ECD460246DC0731',
  },
  {
    name: 'mBTC/tBTCv2',
    address: '0xc3280306b6218031E61752d060b091278d45c329',
    type: 'pool',
    abi: FeederPoolABI,
    chain: mainnet.id,
    icon: MBTC,
    vaultAddress: '0x97E2a2F97A2E9a4cFB462a49Ab7c8D205aBB9ed9',
  },
  {
    name: 'mUSD/FRAX',
    address: '0xb30a907084ac8a0d25dddab4e364827406fd09f0',
    type: 'pool',
    abi: FeederPoolABI,
    chain: polygon.id,
    icon: MBTC,
  },
];
