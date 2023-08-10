import { USDC } from '@frontend/shared-icons';
import { erc20ABI } from 'wagmi';
import { baseGoerli } from 'wagmi/chains';

import type { Token } from './types';

export const toksBaseGoerli: Token[] = [
  {
    address: '0x1', // TODO: add
    symbol: 'USDC',
    name: 'USD Coin',
    icon: USDC,
    decimals: 6,
    chainId: baseGoerli.id,
    abi: erc20ABI,
  },
  {
    address: '0x2', // TODO: add
    symbol: 'mStable',
    name: 'Flatcoin',
    decimals: 18,
    chainId: baseGoerli.id,
    abi: erc20ABI,
  },
];
