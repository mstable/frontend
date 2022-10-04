import type { MakeGenerics } from '@tanstack/react-location';

import type {
  ChartTimeframe,
  ChartType,
} from './components/VaultPerformance/types';

export type MvGenerics = MakeGenerics<{
  Params: { mvid?: string };
  Search: { chartType?: ChartType; chartTimeframe?: ChartTimeframe };
}>;
