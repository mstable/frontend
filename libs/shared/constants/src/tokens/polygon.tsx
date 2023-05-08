import { erc20ABI } from 'wagmi';

import type { Token } from './types';

export const toksPolygon: Token[] = [
  {
    address: '0xf501dd45a1198c2e1b5aef5314a68b9006d842e0',
    symbol: 'MTA',
    decimals: 18,
    chainId: 137,
    abi: erc20ABI,
  },
  {
    address: '0xE840B73E5287865EEc17d250bFb1536704B43B21',
    symbol: 'mUSD',
    decimals: 18,
    chainId: 137,
    abi: erc20ABI,
  },
  {
    address: '0x5290Ad3d83476CA6A2b178Cd9727eE1EF72432af',
    symbol: 'imUSD',
    decimals: 18,
    chainId: 137,
    abi: erc20ABI,
  },
  {
    address: '0x104592a158490a9228070E0A8e5343B499e125D0',
    symbol: 'FRAX',
    decimals: 18,
    chainId: 137,
    abi: erc20ABI,
  },
  {
    address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    symbol: 'USDC',
    decimals: 6,
    chainId: 137,
    abi: erc20ABI,
  },
  {
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    symbol: 'USDT',
    decimals: 6,
    chainId: 137,
    abi: erc20ABI,
  },
  {
    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    symbol: 'DAI',
    decimals: 18,
    chainId: 137,
    abi: erc20ABI,
  },
  {
    address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
    symbol: 'WMATIC',
    decimals: 18,
    chainId: 137,
    abi: erc20ABI,
  },
  {
    address: '0x9a71012B13CA4d3D0Cdc72A177DF3ef03b0E76A3',
    symbol: 'BAL',
    decimals: 18,
    chainId: 137,
    abi: erc20ABI,
  },
];
