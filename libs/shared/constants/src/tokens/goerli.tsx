import { erc20ABI } from 'wagmi';

import { DEAD_ADDRESS } from '../utils';

import type { Token } from './types';

export const toksGoerli: Token[] = [
  {
    address: '0x5A036AFae87e6AEBf4eBc01bbEfb3F009eB01772',
    symbol: 'TAG',
    decimals: 18,
    chainId: 5,
    abi: erc20ABI,
  },
  {
    address: '0x0145A7fB49402b29BE7C52D38aeACB5e1aCAe11b',
    symbol: 'TVG',
    decimals: 18,
    chainId: 5,
    abi: erc20ABI,
  },
  {
    address: DEAD_ADDRESS,
    name: 'mUSD',
    symbol: 'MUSD',
    decimals: 18,
    chainId: 5,
    abi: erc20ABI,
  },
  {
    address: '0x0E9D375eB0AF701a32C6F82043B7Ede715F906f0',
    name: 'Binance',
    symbol: 'BUSD',
    decimals: 18,
    chainId: 5,
    abi: erc20ABI,
  },
  {
    address: '0x600df0dE0c53d890a3BB532d4983882d7368faF0',
    name: 'Liquidity',
    symbol: 'LUSD',
    decimals: 18,
    chainId: 5,
    abi: erc20ABI,
  },
  {
    address: '0xda974a2cCE43015c00812A2576B0E7Df2Fc2589E',
    name: 'Frax',
    symbol: 'FRAX',
    decimals: 18,
    chainId: 5,
    abi: erc20ABI,
  },
  {
    address: '0x11fe4b6ae13d2a6055c8d9cf65c55bac32b5d844',
    name: 'DAI',
    symbol: 'DAI',
    decimals: 18,
    chainId: 5,
    abi: erc20ABI,
  },
  {
    address: '0x2f3a40a3db8a7e3d09b0adfefbce4f6f81927557',
    name: 'USDC',
    symbol: 'USDC',
    decimals: 6,
    chainId: 5,
    abi: erc20ABI,
  },
  {
    address: '0x509ee0d083ddf8ac028f2a56731412edd63223b9',
    name: 'USDT',
    symbol: 'USDT',
    decimals: 6,
    chainId: 5,
    abi: erc20ABI,
  },
  {
    address: '0x117D23cAAb589eA68126b4EC7CaB3Ec10534B859',
    name: 'FEI',
    symbol: 'FEI',
    decimals: 18,
    chainId: 5,
    abi: erc20ABI,
  },
  {
    address: '0x06a69Af8008e80a6729636c9Fc5AFba2a25b541C',
    name: 'mBTC',
    symbol: 'MBTC',
    decimals: 18,
    chainId: 5,
    abi: erc20ABI,
  },
  {
    address: '0xcf52b9a188705Ae54DcC899250A8B3506552C675',
    name: 'MTA',
    symbol: 'MTA',
    decimals: 18,
    chainId: 5,
    abi: erc20ABI,
  },
  {
    address: '0xb841d595Ca17735d2E0eb3525f3DB699850E2d17',
    name: 'Rai Reflex Index',
    symbol: 'RAI',
    decimals: 18,
    chainId: 5,
    abi: erc20ABI,
  },
];
