import { optimismGoerli } from 'wagmi/chains';

import { FlatcoinDelayedOrder } from '../abis';

import type { Contract } from '../types';

export const flatcoinDelayedOrderOptimismGoerli: Contract = {
  address: '0x', //TODO: add
  chainId: optimismGoerli.id,
  abi: FlatcoinDelayedOrder,
  name: 'FlatcoinDelayedOrder',
};

export const contractsOptimismGoerli: Contract[] = [
  flatcoinDelayedOrderOptimismGoerli,
];
