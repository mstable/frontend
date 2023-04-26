import { erc20ABI } from 'wagmi';

import type { Token } from './types';

export const toksPolygonMumbai: Token[] = [
  {
    address: '0x0f7a5734f208A356AB2e5Cf3d02129c17028F3cf',
    symbol: 'mUSD',
    decimals: 18,
    chainId: 80001,
    abi: erc20ABI,
  },
  {
    address: '0x8F6F8064A0222F138d56C077a7F27009BDBBE3B1',
    symbol: 'FRAX',
    decimals: 18,
    chainId: 80001,
    abi: erc20ABI,
  },
];
