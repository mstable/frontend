import type { DynamicTradingToken } from '@dhedge/core-ui-kit/types';
import type { Token } from '@frontend/shared-constants';
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
type TokenInfo = Token & { balance: string; price: string };

export interface LeveragedPosition {
  additionalSize: string;
  entryCumulativeFunding: string;
  entryPrice: string;
  marginDeposited: string;
  accruedFunding: string;
  marginAfterSettlement: string;
  profitLoss: string;
}

export interface Order {
  type: number;
  keeperFee: string;
  executableAtTime: string;
  orderData: string;
  maxExecutabilityAge: string;
  minExecutabilityAge: string;
}

export interface FlatcoinTradingState {
  sendToken: DynamicTradingToken;
  receiveToken: DynamicTradingToken;
  leverage: string;
  tradingType: TradingType;
  slippage: string;
  isInfiniteAllowance: boolean;
  needsApproval: boolean;
  isInsufficientBalance: boolean;
  refetch: () => void;
  reset: () => void;
  keeperFee: {
    rawFee: string;
    formattedFee: string;
  };
}

export type FlatcoinState = {
  data: {
    apy?: string;
    tvl?: string;
    fundingRate?: string;
    openInterest?: string;
    skew?: string;
  };
  tokens: {
    collateral: TokenInfo;
    flatcoin: TokenInfo;
  };
  configs: Record<PositionType, any>;
  leveragedPositions?: LeveragedPosition[];
  announcedOrder: Order | null;
  type: PositionType;
  flatcoinChainId: number;
};

export interface PriceFeedData {
  price: {
    conf: string;
    expo: number;
    price: string;
    publish_time: number;
  };
}
