import { optimism } from 'wagmi/chains';

import { L2ComptrollerABI } from '../abis/L2ComptrollerABI';

import type { Contract } from '../types';

export const contractsOptimism: Contract[] = [
  {
    address: '0x0f6eae52ae1f94bc759ed72b201a2fdb14891485',
    chainId: optimism.id,
    abi: L2ComptrollerABI,
    name: 'L2Comptroller',
  },
];
