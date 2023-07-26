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
}
