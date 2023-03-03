import { mainnet, polygon } from 'wagmi/chains';

import type { FeederPool } from './types';

const main: FeederPool[] = [
  {
    address: '0x9b4aba35b35eee7481775ccb4055ce4e176c9a6f',
    name: 'Uniswap',
    info: 'The mStable EARN Pool for Uniswap V2 MTA<>WETH position.',
    poolType: 'uni',
  },
  {
    address: '0x0d4cd2c24a4c9cd31fcf0d3c4682d234d9f94be4',
    name: 'Balancer',
    info: 'The mStable EARN Pool for Balancer 95/5 mUSD/MTA position.',
    poolType: 'bal',
  },
  {
    address: '0x25970282aac735cd4c76f30bfb0bf2bc8dad4e70',
    name: 'Balancer',
    info: 'The mStable EARN Pool for Balancer mUSD<>MTA position.',
    poolType: 'bal',
  },
  {
    address: '0x881c72d1e6317f10a1cdcbe05040e7564e790c80',
    name: 'Balancer',
    info: 'The mStable EARN Pool for Balancer mUSD<>USDC position.',
    poolType: 'bal',
  },
  {
    address: '0xf4a7d2d85f4ba11b5c73c35e27044c0c49f7f027',
    name: 'Balancer',
    info: 'The mStable EARN Pool for Balancer mUSD<>MTA position.',
    poolType: 'bal',
  },
  {
    address: '0xf7575d4d4db78f6ba43c734616c51e9fd4baa7fb',
    name: 'Balancer',
    info: 'The mStable EARN Pool for Balancer USD<>WETH position.',
    poolType: 'bal',
  },
  {
    address: '0xaE8bC96DA4F9A9613c323478BE181FDb2Aa0E1BF',
    name: 'vMTA',
    info: 'The mStable legacy staking contract.',
    poolType: 'vmta',
  },
];

const poly: FeederPool[] = [];

export const feederPools: Record<number, FeederPool[]> = {
  [mainnet.id]: main,
  [polygon.id]: poly,
};
