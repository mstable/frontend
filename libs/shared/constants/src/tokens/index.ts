import { goerli, mainnet, polygon, polygonMumbai } from 'wagmi/chains';

import { toksGoerli } from './goerli';
import { toksMainnet } from './mainnet';
import { toksPolygon } from './polygon';
import { toksPolygonMumbai } from './polygonMumbai';

export * from './types';

export const tokens = {
  [mainnet.id]: toksMainnet,
  [goerli.id]: toksGoerli,
  [polygon.id]: toksPolygon,
  [polygonMumbai.id]: toksPolygonMumbai,
};

export const tokenList = [
  ...toksMainnet,
  ...toksGoerli,
  ...toksPolygon,
  ...toksPolygonMumbai,
];
