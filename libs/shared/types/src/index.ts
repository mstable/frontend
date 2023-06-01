import type { Address } from '@dhedge/core-ui-kit/types';

export interface TokenPriceHistory {
  adjustedTokenPrice: string;
  timestamp: string;
  tokenPrice: string;
  performance: string;
}

export interface TokenPriceHistoryQuery {
  tokenPriceHistory: {
    history: TokenPriceHistory[];
  };
}

export interface TokenPriceHistoryQueryVariables {
  address: Address;
  period: CHART_PERIOD;
}

export enum CHART_PERIOD {
  DAY = '1d',
  WEEK = '1w',
  MONTH = '1m',
  YEAR = '1y',
}

export enum CHART_TYPE {
  PRICE = 'price',
}
