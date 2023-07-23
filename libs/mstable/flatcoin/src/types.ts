import type { DynamicTradingToken } from '@dhedge/core-ui-kit/types';

export type FlatcoinTradingPanelType = 'stable' | 'leveraged';

export interface FlatcoinPageState {
  type: FlatcoinTradingPanelType;
}

export interface FlatcoinTradingState {
  sendToken: DynamicTradingToken;
  receiveToken: DynamicTradingToken;
  leverage: string;
}
