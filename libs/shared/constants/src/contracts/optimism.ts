import { optimism } from 'wagmi/chains';

import { L2ComptrollerABI } from '../abis/L2ComptrollerABI';
import { PoolLogicABI } from '../abis/PoolLogicABI';
import { VelodromeV1PoolABI } from '../abis/VelodromeV1PoolABI';

import type { Contract } from '../types';

export const contractsOptimism: Contract[] = [
  {
    address: '0x3509816328cf50Fed7631c2F5C9a18c75cd601F0',
    chainId: optimism.id,
    abi: L2ComptrollerABI,
    name: 'L2Comptroller',
  },
  {
    address: '0x0F6eAe52ae1f94Bc759ed72B201A2fDb14891485',
    chainId: optimism.id,
    abi: PoolLogicABI,
    name: 'MTy Pool',
  },
  {
    address: '0x66a8bD7cCfD52bfb5bC838d149FBa78e6920303F',
    chainId: optimism.id,
    abi: VelodromeV1PoolABI,
    name: 'VolatileV1 AMM - USDC/MTA',
  },
];
