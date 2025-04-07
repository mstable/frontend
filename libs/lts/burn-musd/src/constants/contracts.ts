import {
  L1ComptrollerV2ABI,
  L2ComptrollerV2ABI,
} from '@frontend/shared-constants';
import { arbitrum, mainnet } from 'wagmi/chains';

import type { Contract } from '@frontend/shared-constants';

export const l2ComptrollerContract: Contract = {
  address: '0xa30ee837aE10Acb36fF75eA4a720E1fAa1BA2293',
  chainId: arbitrum.id,
  abi: L2ComptrollerV2ABI,
  name: 'L2Comptroller',
};

export const l1ComptrollerContract: Contract = {
  address: '0x53750692bb134c7de46f174d1ccb96e0c2270096',
  chainId: mainnet.id,
  abi: L1ComptrollerV2ABI,
  name: 'L1Comptroller',
};
