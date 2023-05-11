import { MTA, Optimism, USDC } from '@frontend/shared-icons';
import { erc20ABI } from 'wagmi';
import { optimism } from 'wagmi/chains';

import type { Token } from './types';

export const toksOptimism: Token[] = [
  {
    address: '0x929b939f8524c3be977af57a4a0ad3fb1e374b50',
    symbol: 'MTA',
    icon: MTA,
    decimals: 18,
    chainId: optimism.id,
    abi: erc20ABI,
  },
  {
    address: '0x0f6eae52ae1f94bc759ed72b201a2fdb14891485',
    symbol: 'MTy',
    name: 'mStable Treasury Yield',
    icon: Optimism,
    decimals: 18,
    chainId: optimism.id,
    abi: erc20ABI,
  },
  {
    address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    symbol: 'USDC',
    name: 'USD Coin',
    icon: USDC,
    decimals: 6,
    chainId: optimism.id,
    abi: erc20ABI,
  },
];
