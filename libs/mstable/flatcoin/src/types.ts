import type { DynamicTradingToken } from '@dhedge/core-ui-kit/types';
import type { Token } from '@frontend/shared-constants';
import type { CHART_PERIOD, CHART_TYPE } from '@frontend/shared-types';
import type { BigDecimal } from '@frontend/shared-utils';
import type { MakeGenerics } from '@tanstack/react-location';

export type FlatcoinRoute = MakeGenerics<{
  Search: {
    chartPeriod?: CHART_PERIOD;
    chartType?: CHART_TYPE;
    type?: PositionType;
    action?: TradingType;
  };
}>;

export type PositionType = 'flatcoin' | 'leveragedeth';
export type TradingType = 'deposit' | 'withdraw';
type TokenInfo = Token & { balance: BigDecimal; price: BigDecimal };

export interface LeveragedPosition {
  positionId: string;
  leverage: number;
  entryPrice: BigDecimal;
  marginDeposited: BigDecimal;
  additionalSize: BigDecimal;
  marginAfterSettlement: BigDecimal;
  profitLoss: BigDecimal;
  approvedAddress: string;
  entryCumulativeFunding: BigDecimal;
  accruedFunding: BigDecimal;
}

export interface Order {
  type: number;
  keeperFee: BigDecimal;
  executableAtTime: string;
  orderData: string;
  maxExecutabilityAge: string;
  minExecutabilityAge: string;
}

export interface FlatcoinTradingState {
  sendToken: DynamicTradingToken;
  receiveToken: DynamicTradingToken;
  leverage: string;
  rawMaxFillPrice: BigDecimal;
  slippage: string;
  isInfiniteAllowance: boolean;
  needsApproval: boolean;
  isInsufficientBalance: boolean;
  refetchAllowance: () => void;
  reset: () => void;
}

export type FlatcoinState = {
  data: {
    apy?: string;
    tvl?: string;
    fundingRate?: number;
    openInterest?: string;
    skew?: number;
  };
  tokens: {
    collateral: TokenInfo;
    flatcoin: TokenInfo;
  };
  configs: Record<PositionType, any>;
  leveragedPositions?: LeveragedPosition[];
  announcedOrder: Order | null;
  flatcoinChainId: number;
  keeperFee: BigDecimal;
};

export interface PriceFeedData {
  price: {
    conf: string;
    expo: number;
    price: string;
    publish_time: number;
  };
}
