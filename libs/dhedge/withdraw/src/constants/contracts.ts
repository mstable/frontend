import {
  L1ComptrollerV2ABI,
  L2ComptrollerV2ABI,
} from '@frontend/shared-constants';
import { arbitrum, mainnet } from 'wagmi/chains';

import type { Contract } from '@frontend/shared-constants';

export const l2ComptrollerContract: Contract = {
  address: '0x0659466338768dD2c648CdcE03EB26A9E7cc0369',
  chainId: arbitrum.id,
  abi: L2ComptrollerV2ABI,
  name: 'L2Comptroller',
};

export const l1ComptrollerContract: Contract = {
  address: '0xc87E1c912a346Db265616De90c95232D09A7F692',
  chainId: mainnet.id,
  abi: L1ComptrollerV2ABI,
  name: 'L1Comptroller',
};
