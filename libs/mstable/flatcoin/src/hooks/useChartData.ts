import { CHART_PERIOD, CHART_TYPE } from '@frontend/shared-types';
import { alpha, useTheme } from '@mui/material';
import { useChartConfig } from '@frontend/shared-hooks';
import { useMemo } from 'react';
import { ChartData, ChartOptions, ScriptableContext } from 'chart.js';
import { pluck } from 'ramda';
import { isNilOrEmpty } from '@frontend/shared-utils';

type Serie = { label: string; value: any };

const getRange = (margin: number, series: Serie[]) =>
  !isNilOrEmpty(series)
    ? series.reduce(
        (acc, curr) => ({
          min: Math.min(acc.min, Number(curr.value) - margin),
          max: Math.max(acc.max, Number(curr.value) + margin),
        }),
        {
          min: series[0].value,
          max: series[0].value,
        },
      )
    : {
        min: undefined,
        max: undefined,
      };

const getBackgroundColor =
  (tone: string) => (ctx: ScriptableContext<'line'>) => {
    const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);

    gradient?.addColorStop(0, alpha(tone, 0.4));
    gradient?.addColorStop(0.25, alpha(tone, 0.2));
    gradient?.addColorStop(1, alpha(tone, 0));

    return gradient;
  };

export const useChartData = ({
  chartPeriod,
  chartType,
  scales = { x: true, y: true },
}: {
  chartPeriod: CHART_PERIOD;
  chartType: CHART_TYPE;
  scales?: { x?: boolean; y?: boolean };
}) => {
  const { x = true, y = true } = scales;
  const theme = useTheme();
  const { chartTypes } = useChartConfig();

  const { data } = {
    data: {
      tokenPriceHistory: {
        history: [],
      },
    },
  };

  const series = useMemo<Serie[]>(
    () =>
      (data?.tokenPriceHistory?.history || []).map((d) => ({
        label: Intl.DateTimeFormat('en-US', {
          timeZone: 'UTC',
          day: 'numeric',
          month: 'short',
        }).format(Number(d.timestamp)),
        value: chartTypes[chartType].getValue(d),
      })),
    [chartType, chartTypes, data?.tokenPriceHistory?.history],
  );
  const minMax = useMemo(
    () =>
      ({
        [CHART_TYPE.PRICE]: getRange(chartTypes[chartType].chartMargin, series),
      }[chartType]),
    [chartType, chartTypes, series],
  );

  const chartData: { data: ChartData<'line'>; options: ChartOptions<'line'> } =
    useMemo(
      () => ({
        data: {
          labels: series.map((d) => d.label),
          datasets: [
            {
              label: chartTypes[chartType].label,
              data: pluck('value', series),
              borderColor: '#2775CA',
              backgroundColor: getBackgroundColor('#2775CA'),
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          interaction: {
            mode: 'nearest',
            intersect: false,
          },
          datasets: {
            line: {
              tension: 0.2,
              pointRadius: 0,
            },
          },
          scales: {
            y: {
              display: y,
              grid: {
                color: theme.palette.divider,
                drawBorder: false,
              },
              min: minMax?.min,
              max: minMax?.max,
              ticks: {
                callback: chartTypes[chartType].getLabel,
                color: theme.palette.text.secondary,
                count: 5,
                font: {
                  family: theme.typography.value5.fontFamily,
                  size: theme.typography.value5.fontSize,
                  weight: theme.typography.value5.fontWeight,
                } as any,
              },
            },
            x: {
              display: x,
              grid: {
                display: false,
              },
              ticks: {
                color: theme.palette.text.secondary,
                maxTicksLimit: 5,
                maxRotation: 0,
                font: {
                  family: theme.typography.value5.fontFamily,
                  size: theme.typography.value5.fontSize,
                  weight: theme.typography.value5.fontWeight,
                } as any,
              },
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
              backgroundColor:
                theme.palette.mode === 'light'
                  ? theme.palette.grey[200]
                  : theme.palette.grey[800],
              titleColor:
                theme.palette.mode === 'light'
                  ? theme.palette.grey[600]
                  : theme.palette.grey[500],
              bodyColor:
                theme.palette.mode === 'light'
                  ? theme.palette.grey[600]
                  : theme.palette.grey[500],
              padding: 8,
              fontSize: '12px',
              borderRadius: '6px',
              callbacks: {
                label: (context) => chartTypes[chartType].getLabel(context.raw),
              },
            },
          },
        },
      }),
      [
        series,
        chartTypes,
        chartType,
        theme.palette.divider,
        theme.palette.text.secondary,
        theme.palette.mode,
        theme.palette.grey,
        theme.typography.value5.fontFamily,
        theme.typography.value5.fontSize,
        theme.typography.value5.fontWeight,
        minMax?.min,
        minMax?.max,
        x,
        y,
      ],
    );

  return chartData;
};
