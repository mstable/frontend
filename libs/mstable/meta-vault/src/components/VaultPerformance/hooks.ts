/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';

import { useDataSource } from '@frontend/mstable-data-access';
import { BigDecimal, isNilOrEmpty } from '@frontend/shared-utils';
import { alpha, useTheme } from '@mui/material';
import { ascend, pluck, prop, sort } from 'ramda';
import { useIntl } from 'react-intl';

import { useMetavaultQuery } from '../../queries.generated';
import { useMetavault } from '../../state';

import type { ChartData, ChartOptions, ScriptableContext } from 'chart.js';

import type { ChartTimeframe, ChartType } from '../../types';

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

export const useChartConfig = () => {
  const intl = useIntl();
  const {
    metavault: { asset },
  } = useMetavault();
  const chartTypes = {
    APS: {
      id: 'APS' as ChartType,
      label: intl.formatMessage({
        defaultMessage: 'Share Price',
        id: 'TvzL+L',
      }),
      chartMargin: 0.05,
      getValue: (v) => v.assetPerShare,
      getLabel: (v) =>
        Intl.NumberFormat('en-US', { style: 'decimal' }).format(v),
    },
    APY: {
      id: 'APY' as ChartType,
      label: intl.formatMessage({ defaultMessage: 'APY', id: 'MLTKb6' }),
      chartMargin: 0.001,
      getValue: (v) => Number(v.apy),
      getLabel: (v) => (Number(v) * 100).toFixed(2) + '%',
    },
    TVL: {
      id: 'TVL' as ChartType,
      label: intl.formatMessage(
        { defaultMessage: 'TVL ({symbol})', id: 'UMrrVX' },
        { symbol: asset.symbol },
      ),
      chartMargin: 1e4,
      getValue: (v) => new BigDecimal(v.totalAssets, asset.decimals).simple,
      getLabel: (v) =>
        Intl.NumberFormat('en-US', { notation: 'compact' }).format(v),
    },
  };

  const chartTimeframes = {
    '1W': {
      id: '1W' as ChartTimeframe,
      label: intl.formatMessage({ defaultMessage: '1W', id: '6bJGds' }),
      days: 7,
    },
    '1M': {
      id: '1M' as ChartTimeframe,
      label: intl.formatMessage({ defaultMessage: '1M', id: '1uz/I3' }),
      days: 30,
    },
    '1Y': {
      id: '1Y' as ChartTimeframe,
      label: intl.formatMessage({ defaultMessage: '1Y', id: '8lLHeh' }),
      days: 365,
    },
  };

  return {
    chartTypes,
    chartTimeframes,
    defaultChartType: 'APS' as ChartType,
    defaultChartTimeframe: '1M' as ChartTimeframe,
  };
};

const getBackgroundColor =
  (tone: string) => (ctx: ScriptableContext<'line'>) => {
    const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);

    gradient?.addColorStop(0, alpha(tone, 0.4));
    gradient?.addColorStop(0.25, alpha(tone, 0.2));
    gradient?.addColorStop(1, alpha(tone, 0));

    return gradient;
  };

export const useChartData = (
  chartTimeframe: ChartTimeframe,
  chartType: ChartType,
) => {
  const {
    metavault: { address, primaryColor, firstBlock },
    mvBalance,
  } = useMetavault();
  const theme = useTheme();
  const { chartTimeframes, chartTypes } = useChartConfig();
  const dataSource = useDataSource();
  const { data } = useMetavaultQuery(
    dataSource,
    {
      id: address,
      firstBlock,
      days: chartTimeframes[chartTimeframe].days,
    },
    {
      queryKey: [address, chartTimeframe, mvBalance?.simple],
      enabled: !!address,
    },
  );

  const series = useMemo(
    () =>
      sort(ascend(prop('timestamp')), data?.vault?.DailyVaultStats || []).map(
        (d) => ({
          label: Intl.DateTimeFormat('en-GB', {
            timeZone: 'UTC',
            day: 'numeric',
            month: 'short',
          }).format(Number(d.timestamp) * 1000),
          value: chartTypes[chartType].getValue(d),
        }),
      ),
    [chartType, chartTypes, data?.vault?.DailyVaultStats],
  );
  const minMax = useMemo(
    () =>
      ({
        APS: getRange(chartTypes[chartType].chartMargin, series),
        APY: getRange(chartTypes[chartType].chartMargin, series),
        TVL: getRange(chartTypes[chartType].chartMargin, series),
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
              borderColor: primaryColor,
              backgroundColor: getBackgroundColor(primaryColor),
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
        primaryColor,
        theme.palette.divider,
        theme.palette.text.secondary,
        theme.palette.mode,
        theme.palette.grey,
        theme.typography.value5.fontFamily,
        theme.typography.value5.fontSize,
        theme.typography.value5.fontWeight,
        minMax?.min,
        minMax?.max,
      ],
    );

  return chartData;
};
