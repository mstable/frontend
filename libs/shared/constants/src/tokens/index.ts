import {
  baseGoerli,
  goerli,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
} from 'wagmi/chains';

import { toksBaseGoerli } from './baseGoerli';
import { toksGoerli } from './goerli';
import { toksMainnet } from './mainnet';
import { toksOptimism } from './optimism';
import { toksPolygon } from './polygon';
import { toksPolygonMumbai } from './polygonMumbai';

import type { Token } from './types';

export * from './types';

export const tokens = {
  [mainnet.id]: toksMainnet,
  [goerli.id]: toksGoerli,
  [polygon.id]: toksPolygon,
  [polygonMumbai.id]: toksPolygonMumbai,
  [optimism.id]: toksOptimism,
  [baseGoerli.id]: toksBaseGoerli,
};

export const toks: Record<number, Record<string, Token>> = Object.entries(
  tokens,
).reduce((acc, [k, v]) => {
  return {
    ...acc,
    [k]: v.reduce((a, c) => {
      return { ...a, [c.symbol]: c };
    }, {}),
  };
}, {});
