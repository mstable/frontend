import { optimismGoerli } from 'wagmi/chains';

import { FlatcoinDelayedOrder } from '../abis';

import type { Contract } from '../types';

export const contractsOptimismGoerli: Contract[] = [
  {
    address: '0x', //TODO: add
    chainId: optimismGoerli.id,
    abi: FlatcoinDelayedOrder,
    name: 'FlatcoinDelayedOrder',
  },
];
