import { erc20ABI } from 'wagmi';
import { baseGoerli } from 'wagmi/chains';

import { FlatcoinStableModuleABI } from '../abis/flatcoin/FlatcoinStableModuleABI';
import { flatcoinStableModuleBaseGoerli } from '../contracts/baseGoerli';

import type { Address } from 'wagmi';

import type { Token } from './types';

export const flatcoinTokenBaseGoerli = {
  address: flatcoinStableModuleBaseGoerli.address,
  symbol: 'FLAT',
  name: 'Flatcoin',
  decimals: 18,
  chainId: baseGoerli.id,
  abi: FlatcoinStableModuleABI,
};

export const flatcoinCollateralBaseGoerli = {
  address: '0xb36B6A4d67951C959CE22A8f30aF083fAc215088' as Address,
  symbol: 'WETH',
  name: 'Fake WETH',
  decimals: 18,
  chainId: baseGoerli.id,
  abi: erc20ABI,
};

export const toksBaseGoerli: Token[] = [
  flatcoinTokenBaseGoerli,
  flatcoinCollateralBaseGoerli,
];
