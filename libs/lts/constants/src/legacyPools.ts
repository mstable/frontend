import {
  BalancerPoolTokenABI,
  UniswapStakedContractABI,
  vmtaABI,
} from '@frontend/shared-constants';
import { Balancer, MTA, UniswapProtocol } from '@frontend/shared-icons';
import { mainnet, polygon } from 'wagmi/chains';

import type { Contract } from './types';

const main: Contract[] = [
  {
    address: '0x9b4aba35b35eee7481775ccb4055ce4e176c9a6f',
    type: 'legacypool',
    name: 'MTA/WETH Uniswap',
    icon: UniswapProtocol,
    abi: UniswapStakedContractABI,
  },
  {
    address: '0x0d4cd2c24a4c9cd31fcf0d3c4682d234d9f94be4',
    type: 'legacypool',
    name: ' mUSD/MTA Balancer',
    icon: Balancer,
    abi: BalancerPoolTokenABI,
  },
  {
    address: '0x25970282aac735cd4c76f30bfb0bf2bc8dad4e70',
    type: 'legacypool',
    name: ' mUSD/MTA Balancer 3',
    icon: Balancer,
    abi: BalancerPoolTokenABI,
  },
  {
    address: '0x881c72d1e6317f10a1cdcbe05040e7564e790c80',
    type: 'legacypool',
    name: 'mUSD/USDC Balancer',
    icon: Balancer,
    abi: BalancerPoolTokenABI,
  },
  {
    address: '0xf4a7d2d85f4ba11b5c73c35e27044c0c49f7f027',
    type: 'legacypool',
    name: 'mUSD/MTA Balancer 4',
    icon: Balancer,
    abi: BalancerPoolTokenABI,
  },
  {
    address: '0xf7575d4d4db78f6ba43c734616c51e9fd4baa7fb',
    type: 'legacypool',
    name: 'USD/WETH Balancer',
    icon: Balancer,
    abi: BalancerPoolTokenABI,
  },
  {
    address: '0xaE8bC96DA4F9A9613c323478BE181FDb2Aa0E1BF',
    type: 'legacypool',
    name: 'vMTA',
    icon: MTA,
    abi: vmtaABI,
    balanceFn: 'staticBalanceOf',
  },
];

export const legacyPools = {
  [mainnet.id]: main,
  [polygon.id]: [],
};
