import { useMemo } from 'react';

import { useGetTokenPriceHistory } from '@frontend/shared-providers';
import { CHART_PERIOD, CHART_TYPE } from '@frontend/shared-types';
import { isNilOrEmpty } from '@frontend/shared-utils';
import { alpha, useTheme } from '@mui/material';
import BigNumber from 'bignumber.js';
import { getUnixTime, set, sub } from 'date-fns';
import { pluck } from 'ramda';
import { useIntl } from 'react-intl';

import { useFlatcoin } from '../state';

import type { ChartConfig } from '@frontend/shared-hooks';
import type { UseTokenPriceHistoryRequest } from '@frontend/shared-providers';
import type { ChartData, ChartOptions, ScriptableContext } from 'chart.js';

type Serie = { label: string; value: number };

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

const getDurationFromChartPeriod = (
  period: CHART_PERIOD,
): Pick<UseTokenPriceHistoryRequest, 'from' | 'to'> => {
  // prevent timestamp update during minute
  const now = set(new Date(), { seconds: 0, milliseconds: 0 });
  const nowUnix = getUnixTime(now);

  switch (period) {
    case CHART_PERIOD.DAY:
      return { from: getUnixTime(sub(now, { days: 1 })), to: nowUnix };
    case CHART_PERIOD.WEEK:
      return { from: getUnixTime(sub(now, { weeks: 1 })), to: nowUnix };
    case CHART_PERIOD.MONTH:
      return { from: getUnixTime(sub(now, { months: 1 })), to: nowUnix };
    case CHART_PERIOD.YEAR:
      return { from: getUnixTime(sub(now, { years: 1 })), to: nowUnix };
  }
};

export const useChartConfig = (): ChartConfig => {
  const intl = useIntl();

  const chartTypes: Record<CHART_TYPE, any> = {
    [CHART_TYPE.PRICE]: {
      id: CHART_TYPE.PRICE,
      label: intl.formatMessage({
        defaultMessage: 'Token Price',
        id: 'ehxGBh',
      }),
      chartMargin: 0.05,
      getValue: (item) =>
        new BigNumber(item.adjustedTokenPrice).plus(1).toNumber(),
      getLabel: (item) =>
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 4,
        }).format(item),
    },
  };

  const chartPeriods: ChartConfig['chartPeriods'] = {
    [CHART_PERIOD.DAY]: {
      id: CHART_PERIOD.DAY,
      label: intl.formatMessage({ defaultMessage: '1D', id: 'aTX7LJ' }),
    },
    [CHART_PERIOD.WEEK]: {
      id: CHART_PERIOD.WEEK,
      label: intl.formatMessage({ defaultMessage: '1W', id: '6bJGds' }),
    },
    [CHART_PERIOD.MONTH]: {
      id: CHART_PERIOD.MONTH,
      label: intl.formatMessage({ defaultMessage: '1M', id: '1uz/I3' }),
    },
    [CHART_PERIOD.YEAR]: {
      id: CHART_PERIOD.YEAR,
      label: intl.formatMessage({ defaultMessage: '1Y', id: '8lLHeh' }),
    },
  };

  return {
    chartTypes,
    chartPeriods,
    defaultChartType: CHART_TYPE.PRICE,
    defaultChartPeriod: CHART_PERIOD.MONTH,
  };
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
  const intl = useIntl();
  const { x = true, y = true } = scales;
  const { type } = useFlatcoin();
  const theme = useTheme();
  const { chartTypes } = useChartConfig();

  const { from, to } = getDurationFromChartPeriod(chartPeriod);

  const { data: prices } = useGetTokenPriceHistory(
    {
      tokenId: 'ethereum',
      from,
      to,
    },
    {
      enabled: type === 'leveragedeth',
      staleTime: 20_000,
    },
  );

  const data = type === 'leveragedeth' ? prices : [];

  const series = useMemo<Serie[]>(
    () =>
      (data || []).map(([timestamp, price]) => ({
        label: Intl.DateTimeFormat('en-US', {
          timeZone: 'UTC',
          day: 'numeric',
          month: 'short',
          year: '2-digit',
        }).format(Number(timestamp)),
        value: price,
      })),
    [chartType, data],
  );
  const minMax = useMemo(
    () =>
      ({
        [CHART_TYPE.PRICE]: getRange(0.05, series),
      }[chartType]),
    [chartType, series],
  );

  const chartData: { data: ChartData<'line'>; options: ChartOptions<'line'> } =
    useMemo(
      () => ({
        data: {
          labels: series.map((d) => d.label),
          datasets: [
            {
              label: intl.formatMessage({
                defaultMessage: 'Token Price',
                id: 'ehxGBh',
              }),
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
