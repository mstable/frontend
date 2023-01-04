import type { TransactionType } from '@frontend/mstable-data-access';
import type { HexAddress } from '@frontend/shared-utils';
import type { MakeGenerics } from '@tanstack/react-location';
import type { FetchTokenResult } from '@wagmi/core';
import type { BigNumber } from 'ethers';

export type SupportedOperation = 'deposit' | 'mint' | 'withdraw' | 'redeem';

export type MvRoute = MakeGenerics<{
  Params: { mvid?: string };
  Search: {
    chartType?: ChartType;
    chartTimeframe?: ChartTimeframe;
    chartExpand?: boolean;
    input?: {
      amount: number;
      operation: SupportedOperation;
    };
  };
}>;

export type ChartType = 'APY' | 'TVL' | 'APS';

export type ChartTimeframe = '1W' | '1M' | '1Y';

export type Vault = {
  address: HexAddress;
  name: string;
  decimals: number;
};

export type TxHistory = {
  timestamp: string;
  type: TransactionType;
  shareAmount: BigNumber;
  assetAmount: BigNumber;
  hash: string;
  to: string;
  from: string;
};

export type MvToken = {
  totalAssets: {
    formatted: string;
    value: BigNumber;
  };
} & FetchTokenResult;
