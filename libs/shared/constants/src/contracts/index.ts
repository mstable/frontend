import { mainnet, optimism, optimismGoerli } from 'wagmi/chains';

import { contractsMainnet } from './mainnet';
import { contractsOptimism } from './optimism';
import { contractsOptimismGoerli } from './optimismGoerli';

import type { Contract } from '../types';

export const contracts = {
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
