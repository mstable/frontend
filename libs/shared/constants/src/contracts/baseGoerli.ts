import { baseGoerli } from 'wagmi/chains';

import { FlatcoinDelayedOrder } from '../abis';

import type { Contract } from '../types';

export const flatcoinDelayedOrderBaseGoerli: Contract = {
  address: '0x', //TODO: add
  chainId: baseGoerli.id,
  abi: FlatcoinDelayedOrder,
  name: 'FlatcoinDelayedOrder',
};

export const contractsBaseGoerli: Contract[] = [flatcoinDelayedOrderBaseGoerli];
