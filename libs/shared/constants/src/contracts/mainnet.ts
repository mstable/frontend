import { mainnet } from 'wagmi/chains';

import { L1ComptrollerABI } from '../abis/L1ComptrollerABI';

import type { Contract } from '../types';

export const contractsMainnet: Contract[] = [
  {
    address: '0x3509816328cf50Fed7631c2F5C9a18c75cd601F0',
    chainId: mainnet.id,
    abi: L1ComptrollerABI,
    name: 'L1Comptroller',
  },
];
