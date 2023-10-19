import type { Address } from '@dhedge/core-ui-kit/types';
import type { CHART_PERIOD, CHART_TYPE } from '@frontend/shared-types';
import type { MakeGenerics } from '@tanstack/react-location';

export type VaultRoute = MakeGenerics<{
  Params: { address?: string };
  Search: {
    chartPeriod?: CHART_PERIOD;
    chartType?: CHART_TYPE;
  };
}>;

export interface Fund {
  name: string;
  address: Address;
  managerLogicAddress: Address;
  tokenPrice: string;
  totalValue: string;
  totalSupply: string;
  performanceFeeNumerator: string;
  streamingFeeNumerator: string;
  entryFeeNumerator: string;
  blockTime: string;
  riskFactor: number | null;
  performanceMetrics: PerformanceMetrics;
  isPrivate: boolean;
  fundComposition: FundComposition[];
  apy: FundApy | null;
}

export interface PerformanceMetrics {
  day: string;
  week: string;
  month: string;
  quarter: string;
  halfyear: string;
  year: string;
}

export interface FundComposition {
  tokenName: string;
  rate: string;
  amount: string;
  isDeposit: boolean;
  tokenAddress: Address;
  precision: number;
  asset: {
    iconSymbols: string[];
  };
}

export interface FundApy {
  monthly: number;
  weekly: number;
  [period: string]: number;
}

export interface FundQuery {
  fund: Fund;
}

export interface FundQueryVariables {
  address: Address;
}
