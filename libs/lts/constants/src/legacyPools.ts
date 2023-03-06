import { Balancer, MTA, UniswapProtocol } from '@frontend/shared-icons';
import { mainnet, polygon } from 'wagmi/chains';

import type { LegacyPool } from './types';

const main: LegacyPool[] = [
  {
    address: '0x9b4aba35b35eee7481775ccb4055ce4e176c9a6f',
    type: 'legacypool',
    name: 'Uniswap',
    info: 'The mStable EARN Pool for Uniswap V2 MTA<>WETH position.',
    poolType: 'uni',
    icon: UniswapProtocol,
  },
  {
    address: '0x0d4cd2c24a4c9cd31fcf0d3c4682d234d9f94be4',
    type: 'legacypool',
    name: 'Balancer',
    info: 'The mStable EARN Pool for Balancer 95/5 mUSD/MTA position.',
    poolType: 'bal',
    icon: Balancer,
  },
  {
    address: '0x25970282aac735cd4c76f30bfb0bf2bc8dad4e70',
    type: 'legacypool',
    name: 'Balancer',
    info: 'The mStable EARN Pool for Balancer mUSD<>MTA position.',
    poolType: 'bal',
    icon: Balancer,
  },
  {
    address: '0x881c72d1e6317f10a1cdcbe05040e7564e790c80',
    type: 'legacypool',
    name: 'Balancer',
    info: 'The mStable EARN Pool for Balancer mUSD<>USDC position.',
    poolType: 'bal',
    icon: Balancer,
  },
  {
    address: '0xf4a7d2d85f4ba11b5c73c35e27044c0c49f7f027',
    type: 'legacypool',
    name: 'Balancer',
    info: 'The mStable EARN Pool for Balancer mUSD<>MTA position.',
    poolType: 'bal',
    icon: Balancer,
  },
  {
    address: '0xf7575d4d4db78f6ba43c734616c51e9fd4baa7fb',
    type: 'legacypool',
    name: 'Balancer',
    info: 'The mStable EARN Pool for Balancer USD<>WETH position.',
    poolType: 'bal',
    icon: Balancer,
  },
  {
    address: '0xaE8bC96DA4F9A9613c323478BE181FDb2Aa0E1BF',
    type: 'legacypool',
    name: 'vMTA',
    info: 'The mStable legacy staking contract.',
    poolType: 'vmta',
    icon: MTA,
  },
];

export const legacyPools = {
  [mainnet.id]: main,
  [polygon.id]: [],
};
