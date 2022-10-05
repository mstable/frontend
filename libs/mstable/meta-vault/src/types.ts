import type { MakeGenerics } from '@tanstack/react-location';

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
