import { chainId } from 'wagmi';

import { tokens } from './tokens';
import { DEAD_ADDRESS } from './utils';

import type { Token } from './tokens';

export type SupportedVault =
  | 'musdConvex3CrvLiquidatorVault'
  | 'busdConvex3CrvLiquidatorVault'
  | 'lusdConvex3CrvLiquidatorVault'
  | 'fraxConvex3CrvLiquidatorVault';

export type Vault = {
  address: string;
  name: string;
  token: Token;
};

const mainnet: Record<SupportedVault, Vault> = {
  musdConvex3CrvLiquidatorVault: {
    address: DEAD_ADDRESS,
    name: 'musdConvex3CrvLiquidatorVault',
    token: tokens[chainId.mainnet].musd,
  },
  busdConvex3CrvLiquidatorVault: {
    address: DEAD_ADDRESS,
    name: 'busdConvex3CrvLiquidatorVault',
    token: tokens[chainId.mainnet].busd,
  },
  lusdConvex3CrvLiquidatorVault: {
    address: DEAD_ADDRESS,
    name: 'lusdConvex3CrvLiquidatorVault',
    token: tokens[chainId.mainnet].lusd,
  },
  fraxConvex3CrvLiquidatorVault: {
    address: DEAD_ADDRESS,
    name: 'fraxConvex3CrvLiquidatorVault',
    token: tokens[chainId.mainnet].frax,
  },
};

const goerli: Record<SupportedVault, Vault> = {
  musdConvex3CrvLiquidatorVault: {
    address: DEAD_ADDRESS,
    name: 'musdConvex3CrvLiquidatorVault',
    token: tokens[chainId.goerli].musd,
  },
  busdConvex3CrvLiquidatorVault: {
    address: DEAD_ADDRESS,
    name: 'busdConvex3CrvLiquidatorVault',
    token: tokens[chainId.goerli].busd,
  },
  lusdConvex3CrvLiquidatorVault: {
    address: DEAD_ADDRESS,
    name: 'lusdConvex3CrvLiquidatorVault',
    token: tokens[chainId.goerli].lusd,
  },
  fraxConvex3CrvLiquidatorVault: {
    address: DEAD_ADDRESS,
    name: 'fraxConvex3CrvLiquidatorVault',
    token: tokens[chainId.goerli].frax,
  },
};

export const vaults: Record<number, Record<SupportedVault, Vault>> = {
  [chainId.mainnet]: mainnet,
  [chainId.goerli]: goerli,
};
