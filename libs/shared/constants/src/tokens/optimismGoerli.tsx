import { USDC } from '@frontend/shared-icons';
import { erc20ABI } from 'wagmi';
import { optimismGoerli } from 'wagmi/chains';

import type { Token } from './types';

export const toksOptimismGoerli: Token[] = [
  {
    address: '0x1', // TODO: add
    symbol: 'USDC',
    name: 'USD Coin',
    icon: USDC,
    decimals: 6,
    chainId: optimismGoerli.id,
    abi: erc20ABI,
  },
  {
    address: '0x2', // TODO: add
    symbol: 'mStable',
    name: 'Flatcoin',
    decimals: 18,
    chainId: optimismGoerli.id,
    abi: erc20ABI,
  },
];
