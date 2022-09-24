import { BigDecimal } from '@frontend/shared-utils';
import { useIntl } from 'react-intl';

import { useMetavault } from '../../state';

export const useChartConfig = () => {
  const intl = useIntl();
  const { assetToken } = useMetavault();

  const chartTypes = {
    APY: {
      id: 'APY',
      label: intl.formatMessage({ defaultMessage: 'APY' }),
      getValue: (v) => Number(v.apy),
      getLabel: (v) => (Number(v) * 100).toFixed(2) + '%',
    },
    TVL: {
      id: 'TVL',
      label: intl.formatMessage({ defaultMessage: 'TVL' }),
      getValue: (v) =>
        new BigDecimal(v.totalAssets, assetToken?.decimals).simple,
      getLabel: (v) =>
        Intl.NumberFormat(undefined, {
          notation: 'compact',
        }).format(v),
    },
  };

  const chartTimeframes = {
    '1W': {
      id: '1W',
      label: intl.formatMessage({ defaultMessage: '1W' }),
      days: 7,
    },
    '1M': {
      id: '1M',
      label: intl.formatMessage({ defaultMessage: '1M' }),
      days: 30,
    },
    '1Y': {
      id: '1Y',
      label: intl.formatMessage({ defaultMessage: '1Y' }),
      days: 365,
    },
  };

  return { chartTypes, chartTimeframes };
};
