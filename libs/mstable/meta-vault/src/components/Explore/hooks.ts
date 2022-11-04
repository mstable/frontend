import { useMemo } from 'react';

import { alpha } from '@mui/material';
import { sort } from 'ramda';
import { useIntl } from 'react-intl';

import type { ChartArea, ChartData, ChartOptions } from 'chart.js';

import type { MetavaultQuery } from '../../queries.generated';

const getGradient =
  (tone: string) => (ctx: CanvasRenderingContext2D, chartArea?: ChartArea) => {
    const gradient = ctx.createLinearGradient(
      chartArea?.left || 0,
      0,
      chartArea?.right || 0,
      0,
    );
    gradient?.addColorStop(0, alpha(tone, 0));
    gradient?.addColorStop(1, alpha(tone, 1));

    return gradient;
  };

export const useChartData = (data: MetavaultQuery) => {
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
              borderColor: function (context) {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                return getGradient('#2775CA')(ctx, chartArea);
              },
              backgroundColor: 'transparent',
              fill: true,
              pointBackgroundColor: '#2775CA',
              pointRadius: (context) =>
                context.dataIndex === sortedData.length - 1 ? 5 : 0,
            },
          ],
        },
        options: {
          responsive: true,
          datasets: {
            line: {
              tension: 0.4,
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
    }, [data?.vault?.DailyVaultStats, intl]);

  return chartData;
};
