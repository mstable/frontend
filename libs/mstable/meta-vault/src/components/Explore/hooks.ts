import { useMemo } from 'react';

import { useTheme } from '@mui/material';
import { sort } from 'ramda';
import { useIntl } from 'react-intl';

import type { ChartData, ChartOptions } from 'chart.js';

import type { MetavaultQuery } from '../../queries.generated';

export const useChartData = (data: MetavaultQuery) => {
  const theme = useTheme();
  const intl = useIntl();

  const chartData: { data: ChartData<'line'>; options: ChartOptions<'line'> } =
    useMemo(() => {
      const sortedData = sort(
        (a, b) => Number(a.timestamp) - Number(b.timestamp),
        data?.vault?.DailyVaultStats || [],
      ).map((d) => Number(d.apy));

      return {
        data: {
          labels: sortedData.map(() => ''),
          datasets: [
            {
              label: intl.formatMessage({ defaultMessage: 'APY' }),
              data: sortedData,
              borderColor: theme.palette.info.main,
              backgroundColor: 'transparent',
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          datasets: {
            line: {
              tension: 0.2,
              pointRadius: 0,
            },
          },
          scales: {
            y: {
              display: false,
            },
            x: {
              display: false,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
        },
      };
    }, [data?.vault?.DailyVaultStats, intl, theme.palette.info.main]);

  return chartData;
};
