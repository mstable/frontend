import { mainnet, optimism } from 'wagmi/chains';

import { contractsMainnet } from './mainnet';
import { contractsOptimism } from './optimism';

import type { Contract } from '../types';

export const contracts = {
  [mainnet.id]: contractsMainnet,
  [optimism.id]: contractsOptimism,
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
