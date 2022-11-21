import type { TransactionType } from '@frontend/mstable-shared-data-access';
import type { MakeGenerics } from '@tanstack/react-location';
import type { BigNumber } from 'ethers';

import type {
  ChartTimeframe,
  ChartType,
} from './components/VaultPerformance/types';

export type SupportedOperation = 'deposit' | 'mint' | 'withdraw' | 'redeem';

export type MvGenerics = MakeGenerics<{
  Params: { mvid?: string };
  Search: {
    chartType?: ChartType;
    chartTimeframe?: ChartTimeframe;
    input?: {
      amount: number;
      operation: SupportedOperation;
    };
  };
}>;

export type TxHistory = {
  timestamp: string;
  type: TransactionType;
  shareAmount: BigNumber;
  assetAmount: BigNumber;
  hash: string;
  to: string;
  from: string;
};
