import {
  L1ComptrollerV2ABI,
  L2ComptrollerV2ABI,
} from '@frontend/shared-constants';
import { arbitrum, mainnet } from 'wagmi/chains';

import type { Contract } from '@frontend/shared-constants';

export const l2ComptrollerContract: Contract = {
  address: '0x',
  chainId: arbitrum.id,
  abi: L2ComptrollerV2ABI,
  name: 'L2Comptroller',
};

export const l1ComptrollerContract: Contract = {
  address: '0x',
  chainId: mainnet.id,
  abi: L1ComptrollerV2ABI,
  name: 'L1Comptroller',
};
