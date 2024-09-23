import { arbitrum, mainnet } from 'wagmi/chains';

import { L1ComptrollerAbi } from './abis/L1ComptrollerAbi';
import { L2ComptrollerAbi } from './abis/L2ComptrollerAbi';

import type { Contract } from '@frontend/shared-constants';

export const l2ComptrollerContract: Contract = {
  address: '0xa30ee837aE10Acb36fF75eA4a720E1fAa1BA2293',
  chainId: arbitrum.id,
  abi: L2ComptrollerAbi,
  name: 'L2Comptroller',
};

export const l1ComptrollerContract: Contract = {
  address: '0x53750692bB134C7de46f174d1CCB96E0c2270096',
  chainId: mainnet.id,
  abi: L1ComptrollerAbi,
  name: 'L1Comptroller',
};
