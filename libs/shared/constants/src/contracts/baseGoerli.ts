import { baseGoerli } from 'wagmi/chains';

import {
  FlatcoinDelayedOrderABI,
  FlatcoinKeeperFeeABI,
  FlatcoinLeveragedModuleABI,
  FlatcoinOracleModuleABI,
  FlatcoinStableModuleABI,
  FlatcoinVaultABI,
} from '../abis';

import type { Contract } from '../types';

export const flatcoinDelayedOrderBaseGoerli: Contract = {
  address: '0x951c39a3160ddA9B80b54b4A7e71FD0b1cD06554',
  chainId: baseGoerli.id,
  abi: FlatcoinDelayedOrderABI,
  name: 'FlatcoinDelayedOrder',
};

export const flatcoinStableModuleBaseGoerli: Contract = {
  address: '0x30aCAA617Db983DCbD635461cA96d911DA9724c3',
  chainId: baseGoerli.id,
  abi: FlatcoinStableModuleABI,
  name: 'FlatcoinStableModule',
};

export const flatcoinLeveragedModuleBaseGoerli: Contract = {
  address: '0x59510fA26297D61c2fcB704CdB3074983FA5d4E1',
  chainId: baseGoerli.id,
  abi: FlatcoinLeveragedModuleABI,
  name: 'FlatcoinStableModule',
};

export const flatcoinKeeperFeeBaseGoerli: Contract = {
  address: '0x16ecf65e4ca525baf4e5c94006c672024922c557',
  chainId: baseGoerli.id,
  abi: FlatcoinKeeperFeeABI,
  name: 'FlatcoinStableModule',
};

export const flatcoinVaultBaseGoerli: Contract = {
  address: '0x87c4ed2F41179a1cdF10c943905c9DDBD3ffed2C',
  chainId: baseGoerli.id,
  abi: FlatcoinVaultABI,
  name: 'FlatcoinVault',
};

export const flatcoinOracleModuleBaseGoerli: Contract = {
  address: '0x0692e0A9ceAc3a1DDFeA3934AF25EE6f7940635F',
  chainId: baseGoerli.id,
  abi: FlatcoinOracleModuleABI,
  name: 'FlatcoinOracleModule',
};

export const contractsBaseGoerli: Contract[] = [
  flatcoinDelayedOrderBaseGoerli,
  flatcoinStableModuleBaseGoerli,
  flatcoinKeeperFeeBaseGoerli,
  flatcoinVaultBaseGoerli,
  flatcoinLeveragedModuleBaseGoerli,
  flatcoinOracleModuleBaseGoerli,
];
