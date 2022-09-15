import { chainId } from 'wagmi';

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
    address: '',
    name: 'mUSD',
    symbol: 'MUSD',
  },
  busd: {
    address: '',
    name: 'Binance',
    symbol: 'BUSD',
  },
  lusd: {
    address: '',
    name: 'Liquidity',
    symbol: 'LUSD',
  },
  frax: {
    address: '',
    name: 'Frax',
    symbol: 'FRAX',
  },
  dai: {
    address: '',
    name: 'DAI',
    symbol: 'DAI',
  },
  usdc: {
    address: '',
    name: 'USDC',
    symbol: 'USDC',
  },
  usdt: {
    address: '',
    name: 'USDT',
    symbol: 'USDT',
  },
  eth: { address: '', name: '', symbol: '' },
  fei: { address: '', name: '', symbol: '' },
  mbtc: { address: '', name: '', symbol: '' },
  mta: { address: '', name: '', symbol: '' },
  rai: { address: '', name: '', symbol: '' },
};

const goerli: Record<SupportedToken, Token> = {
  musd: {
    address: '',
    name: 'mUSD',
    symbol: 'MUSD',
  },
  busd: {
    address: '',
    name: 'Binance',
    symbol: 'BUSD',
  },
  lusd: {
    address: '',
    name: 'Liquidity',
    symbol: 'LUSD',
  },
  frax: {
    address: '',
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
  eth: { address: '', name: '', symbol: '' },
  fei: { address: '', name: '', symbol: '' },
  mbtc: { address: '', name: '', symbol: '' },
  mta: { address: '', name: '', symbol: '' },
  rai: { address: '', name: '', symbol: '' },
};

export const tokens: Record<number, Record<SupportedToken, Token>> = {
  [chainId.mainnet]: mainnet,
  [chainId.goerli]: goerli,
};
