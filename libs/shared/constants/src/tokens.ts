import { tokens as toks } from '@mstable/metavaults-web';
import { goerli, mainnet, polygon, polygonMumbai } from 'wagmi/chains';

import { DEAD_ADDRESS } from './utils';

import type { HexAddress } from '@frontend/shared-utils';
import type { SupportedToken } from '@mstable/metavaults-web';

export type Token = {
  address: HexAddress;
  name: string;
  symbol: string;
};

const reduceFn = (acc, [key, val]) => ({
  ...acc,
  [key]: {
    address: val.address,
    name: val.name,
    symbol: key.toUpperCase(),
  },
});

const main: Partial<Record<SupportedToken, Token>> = Object.entries(
  toks[mainnet.id],
).reduce(reduceFn, {});

const goer: Partial<Record<SupportedToken, Token>> = Object.entries(
  toks[goerli.id],
).reduce(reduceFn, {
  musd: {
    address: DEAD_ADDRESS,
    name: 'mUSD',
    symbol: 'MUSD',
  },
  busd: {
    address: '0x0E9D375eB0AF701a32C6F82043B7Ede715F906f0',
    name: 'Binance',
    symbol: 'BUSD',
  },
  lusd: {
    address: '0x600df0dE0c53d890a3BB532d4983882d7368faF0',
    name: 'Liquidity',
    symbol: 'LUSD',
  },
  frax: {
    address: '0xda974a2cCE43015c00812A2576B0E7Df2Fc2589E',
    name: 'Frax',
    symbol: 'FRAX',
  },
  dai: {
    address: '0x11fe4b6ae13d2a6055c8d9cf65c55bac32b5d844',
    name: 'DAI',
    symbol: 'DAI',
  },
  usdc: {
    address: '0x2f3a40a3db8a7e3d09b0adfefbce4f6f81927557',
    name: 'USDC',
    symbol: 'USDC',
  },
  usdt: {
    address: '0x509ee0d083ddf8ac028f2a56731412edd63223b9',
    name: 'USDT',
    symbol: 'USDT',
  },
  fei: {
    address: '0x117D23cAAb589eA68126b4EC7CaB3Ec10534B859',
    name: 'FEI',
    symbol: 'FEI',
  },
  mbtc: {
    address: '0x06a69Af8008e80a6729636c9Fc5AFba2a25b541C',
    name: 'mBTC',
    symbol: 'MBTC',
  },
  mta: {
    address: '0xcf52b9a188705Ae54DcC899250A8B3506552C675',
    name: 'MTA',
    symbol: 'MTA',
  },
  rai: {
    address: '0xb841d595Ca17735d2E0eb3525f3DB699850E2d17',
    name: 'Rai Reflex Index',
    symbol: 'RAI',
  },
});

const poly = Object.entries(toks[polygon.id]).reduce(reduceFn, {});

const polygonMum = Object.entries(toks[polygonMumbai.id]).reduce(reduceFn, {});

export const tokens: Record<number, Partial<Record<SupportedToken, Token>>> = {
  [mainnet.id]: main,
  [goerli.id]: goer,
  [polygon.id]: poly,
  [polygonMumbai.id]: polygonMum,
};
