import { useMemo } from 'react';

import { useDataSource } from '@frontend/mstable-data-access';
import { metavaults } from '@frontend/shared-constants';
import { useGetPrices, usePrices } from '@frontend/shared-providers';
import { BigDecimal, isNilOrEmpty } from '@frontend/shared-utils';
import { alpha } from '@mui/material';
import { constants } from 'ethers';
import { ascend, pathOr, pluck, prop, sort } from 'ramda';
import { useIntl } from 'react-intl';
import { mainnet, useContractReads } from 'wagmi';

import { useMetavaultQuery } from './queries.generated';

import type { Metavault } from '@frontend/shared-constants';
import type { HexAddress } from '@frontend/shared-utils';
import type { ChartArea, ChartData, ChartOptions } from 'chart.js';
import type { BigNumberish } from 'ethers';

const getGradient =
  (tone: string) => (ctx: CanvasRenderingContext2D, chartArea?: ChartArea) => {
    const gradient = ctx.createLinearGradient(
      chartArea?.left || 0,
      0,
      chartArea?.right || 0,
      0,
    );
    gradient?.addColorStop(0, alpha(tone ?? '#2F5FEE', 0));
    gradient?.addColorStop(1, alpha(tone ?? '#2F5FEE', 1));

    return gradient;
  };

export const useMetavaultChartData = (
  metavault: Metavault,
  isSmallChart?: boolean,
) => {
  const intl = useIntl();
  const dataSource = useDataSource();
  const { data } = useMetavaultQuery(dataSource, {
    id: metavault.address,
    firstBlock: metavault.firstBlock,
    days: 7,
  });

  const series = useMemo(
    () =>
      !isNilOrEmpty(data?.vault?.DailyVaultStats)
        ? sort(ascend(prop('timestamp')), data.vault.DailyVaultStats).map(
            (d) => ({
              label: '',
              value: prop('assetPerShare', d),
            }),
          )
        : [],
    [data?.vault?.DailyVaultStats],
  );

  const min = useMemo(
    () =>
      !isNilOrEmpty(series)
        ? series.reduce(
            (acc, curr) => Math.min(acc, Number(curr.value) - 0.005),
            series[0].value,
          )
        : undefined,
    [series],
  );

  const max = useMemo(
    () =>
      !isNilOrEmpty(series)
        ? series.reduce(
            (acc, curr) => Math.max(acc, Number(curr.value) + 0.005),
            series[0].value,
          )
        : undefined,
    [series],
  );

  const chartData: { data: ChartData<'line'>; options: ChartOptions<'line'> } =
    useMemo(
      () => ({
        data: {
          labels: pluck('label', series),
          datasets: [
            {
              label: intl.formatMessage({
                defaultMessage: 'Perf',
                id: 'qNhf66',
              }),
              data: pluck('value', series),
              borderColor: function (context) {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                return getGradient(metavault?.primaryColor)(ctx, chartArea);
              },
              borderWidth: isSmallChart ? 2 : 3,
              backgroundColor: 'transparent',
              fill: true,
              pointBackgroundColor: metavault?.primaryColor,
              pointRadius: 0,
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
              min,
              max,
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
      }),
      [intl, isSmallChart, max, min, metavault?.primaryColor, series],
    );

  return chartData;
};

export const useTotalTvl = () => {
  const { currency } = usePrices();
  const mvs = metavaults[mainnet.id];
  const assets = mvs.map((mv) => mv.asset.address);
  const decimals = mvs.map((mv) => mv.asset.decimals);
  const { data: tvls, isLoading: tvlsLoading } = useContractReads({
    contracts: mvs.map((mv) => ({
      address: mv.address,
      abi: mv.abi,
      functionName: 'totalAssets',
    })),
  });
  const { data: prices, isLoading: priceLoading } = useGetPrices(
    assets as HexAddress[],
  );

  return useMemo(
    () => ({
      data:
        tvlsLoading || priceLoading
          ? 0
          : (assets as string[]).reduce((acc, curr, idx) => {
              const price = pathOr(1, [curr, currency.toLowerCase()], prices);
              const totalAssets = new BigDecimal(
                (tvls?.[idx] as unknown as BigNumberish) ?? constants.One,
                decimals?.[idx] ?? 18,
              ).simple;
              const currPrice = totalAssets * Number(price);

              return acc + currPrice;
            }, 0),
      isLoading: tvlsLoading || priceLoading,
    }),
    [assets, currency, decimals, priceLoading, prices, tvls, tvlsLoading],
  );
};
