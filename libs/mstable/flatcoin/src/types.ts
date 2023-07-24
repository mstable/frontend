import { MakeGenerics } from '@tanstack/react-location';
import { CHART_PERIOD, CHART_TYPE } from '@frontend/shared-types';

export type FlatcoinRoute = MakeGenerics<{
  Search: {
    chartPeriod?: CHART_PERIOD;
    chartType?: CHART_TYPE;
    type?: Lowercase<PositionType>;
  };
}>;

export enum PositionType {
  Flatcoin = 'Flatcoin',
  LeveragedETH = 'LeveragedETH',
}

export interface Position {
  type: PositionType;
  value: string;
  date: string;
  leverageMultiplier?: string;
  liquidation?: string;
  profitLossTotal: string;
  profitLossFunding: string;
}
