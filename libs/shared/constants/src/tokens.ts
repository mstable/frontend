import { chainId } from 'wagmi';

import { DEAD_ADDRESS } from './utils';

export type SupportedToken =
  | 'dai'
  | 'eth'
  | 'fei'
  | 'mbtc'
  | 'mta'
  | 'musd'
  | 'rai'
  | 'usdc'
  | 'usdt'
  | 'lusd'
  | 'frax'
  | 'busd';

export type Token = {
  address: string;
  name: string;
  symbol: string;
};

const mainnet: Record<SupportedToken, Token> = {
  musd: {
    address: '0xe2f2a5C287993345a840Db3B0845fbC70f5935a5',
    name: 'mUSD',
    symbol: 'MUSD',
  },
  busd: {
    address: '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
    name: 'Binance',
    symbol: 'BUSD',
  },
  lusd: {
    address: '0x5f98805A4E8be255a32880FDeC7F6728C6568bA0',
    name: 'Liquidity',
    symbol: 'LUSD',
  },
  frax: {
    address: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
    name: 'Frax',
    symbol: 'FRAX',
  },
  dai: {
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    name: 'DAI',
    symbol: 'DAI',
  },
  usdc: {
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    name: 'USDC',
    symbol: 'USDC',
  },
  usdt: {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    name: 'USDT',
    symbol: 'USDT',
  },
  eth: {
    address: DEAD_ADDRESS,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  fei: {
    address: '0x956F47F50A910163D8BF957Cf5846D573E7f87CA',
    name: 'FEI',
    symbol: 'FEI',
  },
  mbtc: {
    address: '0x945Facb997494CC2570096c74b5F66A3507330a1',
    name: 'mBTC',
    symbol: 'MBTC',
  },
  mta: {
    address: '0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2',
    name: 'MTA',
    symbol: 'MTA',
  },
  rai: {
    address: '0x03ab458634910AaD20eF5f1C8ee96F1D6ac54919',
    name: 'Rai Reflex Index',
    symbol: 'RAI',
  },
};

const goerli: Record<SupportedToken, Token> = {
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
  eth: {
    address: DEAD_ADDRESS,
    name: 'Ethereum',
    symbol: 'ETH',
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
};

export const tokens: Record<number, Record<SupportedToken, Token>> = {
  [chainId.mainnet]: mainnet,
  [chainId.goerli]: goerli,
};
