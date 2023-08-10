import { baseGoerli, mainnet, optimism, optimismGoerli } from 'wagmi/chains';

import { contractsBaseGoerli } from './baseGoerli';
import { contractsMainnet } from './mainnet';
import { contractsOptimism } from './optimism';
import { contractsOptimismGoerli } from './optimismGoerli';

import type { Contract } from '../types';

export const contracts = {
  [baseGoerli.id]: contractsBaseGoerli,
  [mainnet.id]: contractsMainnet,
  [optimism.id]: contractsOptimism,
  [optimismGoerli.id]: contractsOptimismGoerli,
};

export const cons: Record<number, Record<string, Contract>> = Object.entries(
  contracts,
).reduce((acc, [k, v]) => {
  return {
    ...acc,
    [k]: v.reduce((a, c) => {
      return { ...a, [c.address]: c };
    }, {}),
  };
}, {});

export * from './baseGoerli';
export * from './mainnet';
export * from './optimism';
export * from './optimismGoerli';
