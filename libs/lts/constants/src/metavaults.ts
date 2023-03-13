import { MvUSDC } from '@frontend/shared-icons';
import { erc4626ABI } from 'wagmi';
import { mainnet } from 'wagmi/chains';

import type { Contract } from './types';

export const metavaults: Contract[] = [
  {
    address: '0x455fb969dc06c4aa77e7db3f0686cc05164436d2',
    name: '3Pool Convex Meta Vault',
    type: 'metavault',
    icon: MvUSDC,
    abi: erc4626ABI,
    chain: mainnet.id,
  },
];
