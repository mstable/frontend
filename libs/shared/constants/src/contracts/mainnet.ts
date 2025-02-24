import { mainnet } from 'wagmi/chains';

import { L1ComptrollerABI } from '../abis/burn/L1ComptrollerABI';

import type { Contract } from '../types';

export const contractsMainnet: Contract[] = [
  {
    address: '0x06e54ADa21565c4F2Ebe2bc1E3C4BD04262A4616',
    chainId: mainnet.id,
    abi: L1ComptrollerABI,
    name: 'L1Comptroller',
  },
];
