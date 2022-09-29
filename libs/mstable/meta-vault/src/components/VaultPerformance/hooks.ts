import { BigDecimal } from '@frontend/shared-utils';
import { useIntl } from 'react-intl';

import { useMetavault } from '../../state';

import type { ChartTimeframe, ChartType } from './types';

export const useChartConfig = () => {
  const intl = useIntl();
  const mv = useMetavault();

  const chartTypes = {
    APY: {
      id: 'APY' as ChartType,
      label: intl.formatMessage({ defaultMessage: 'APY' }),
      getValue: (v) => Number(v.apy),
      getLabel: (v) => (Number(v) * 100).toFixed(2) + '%',
    },
    TVL: {
      id: 'TVL' as ChartType,
      label: intl.formatMessage({ defaultMessage: 'TVL' }),
      getValue: (v) =>
        new BigDecimal(v.totalAssets, mv?.assetToken?.decimals).simple,
      getLabel: (v) => intl.formatNumber(v, { notation: 'compact' }),
    },
  };

  const chartTimeframes = {
    '1W': {
      id: '1W' as ChartTimeframe,
      label: intl.formatMessage({ defaultMessage: '1W' }),
      days: 7,
    },
    '1M': {
      id: '1M' as ChartTimeframe,
      label: intl.formatMessage({ defaultMessage: '1M' }),
      days: 30,
    },
    '1Y': {
      id: '1Y' as ChartTimeframe,
      label: intl.formatMessage({ defaultMessage: '1Y' }),
      days: 365,
    },
  };

  return {
    chartTypes,
    chartTimeframes,
    defaultChartType: 'TVL' as ChartType,
    defaultChartTimeframe: '1M' as ChartTimeframe,
  };
};
