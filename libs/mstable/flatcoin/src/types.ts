import type { DynamicTradingToken } from '@dhedge/core-ui-kit/types';
import type { CHART_PERIOD, CHART_TYPE } from '@frontend/shared-types';
import type { MakeGenerics } from '@tanstack/react-location';

export type FlatcoinRoute = MakeGenerics<{
  Search: {
    chartPeriod?: CHART_PERIOD;
    chartType?: CHART_TYPE;
    type?: PositionType;
  };
}>;

export type PositionType = 'flatcoin' | 'leveragedeth';
export type TradingType = 'deposit' | 'withdraw';

export interface Position {
  type: PositionType;
  value: string;
  date: string;
  leverageMultiplier?: string;
  liquidation?: string;
  profitLossTotal: string;
  profitLossFunding: string;
}

export interface FlatcoinTradingState {
  sendToken: DynamicTradingToken;
  receiveToken: DynamicTradingToken;
  leverage: string;
  tradingType: TradingType;
  slippage: string;
  isInfiniteAllowance: boolean;
}

export type FlatcoinState = {
  data: {
    apy?: string;
    tvl?: string;
    fundingRate?: string;
    openInterest?: string;
    skew?: string;
  };
  configs: Record<PositionType, any>;
  positions?: Position[];
  type: PositionType;
  flatcoinChainId: number;
};
