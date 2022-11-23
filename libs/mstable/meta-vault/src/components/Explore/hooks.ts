import { useMemo } from 'react';

import { useDataSource } from '@frontend/mstable-shared-data-access';
import { supportedMetavaults } from '@frontend/shared-constants';
import { useGetPrices, usePrices } from '@frontend/shared-prices';
import { BigDecimal, isNilOrEmpty } from '@frontend/shared-utils';
import { alpha } from '@mui/material';
import { constants } from 'ethers';
import { pathOr, pluck, prop, propEq } from 'ramda';
import { useIntl } from 'react-intl';
import {
  chainId,
  erc20ABI,
  erc4626ABI,
  useContractReads,
  useNetwork,
} from 'wagmi';

import { useMetavaultQuery } from '../../queries.generated';

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
    gradient?.addColorStop(0, alpha(tone, 0));
    gradient?.addColorStop(1, alpha(tone, 1));

    return gradient;
  };

export const useChartData = (address: HexAddress, isSmallChart?: boolean) => {
  const intl = useIntl();
  const { chain } = useNetwork();
  const mv = supportedMetavaults[chain?.id ?? chainId.mainnet].find(
    propEq('address', address),
  );
  const dataSource = useDataSource();
  const { data } = useMetavaultQuery(dataSource, {
    id: address,
    firstBlock: mv.firstBlock,
  });

  const series = useMemo(
    () =>
      !isNilOrEmpty(data?.vault?.DailyVaultStats)
        ? data.vault.DailyVaultStats.map((d) => ({
            label: '',
            value: prop('assetPerShare', d),
          }))
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
              label: intl.formatMessage({ defaultMessage: 'Perf' }),
              data: pluck('value', series),
              borderColor: function (context) {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                return getGradient(mv.primaryColor)(ctx, chartArea);
              },
              borderWidth: isSmallChart ? 2 : 3,
              backgroundColor: 'transparent',
              fill: true,
              pointBackgroundColor: mv.primaryColor,
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
      [intl, isSmallChart, max, min, mv.primaryColor, series],
    );

  return chartData;
};

export const useTotalTvl = () => {
  const { chain } = useNetwork();
  const { currency } = usePrices();
  const metavaults = supportedMetavaults[chain?.id || chainId.mainnet];
  const { data: assets, isLoading: assetLoading } = useContractReads({
    contracts: metavaults.map((mv) => ({
      address: mv.address,
      abi: erc4626ABI,
      functionName: 'asset',
    })),
  });
  const { data: tvls, isLoading: tvlsLoading } = useContractReads({
    contracts: metavaults.map((mv) => ({
      address: mv.address,
      abi: erc4626ABI,
      functionName: 'totalAssets',
    })),
  });
  const { data: decimals, isLoading: decimalsLoading } = useContractReads({
    contracts: assets?.map((asset) => ({
      address: asset as HexAddress,
      abi: erc20ABI,
      functionName: 'decimals',
    })),
  });
  const { data: prices, isLoading: priceLoading } = useGetPrices(
    assets as HexAddress[],
  );

  return useMemo(
    () => ({
      data:
        assetLoading || tvlsLoading || decimalsLoading || priceLoading
          ? 0
          : assets.reduce((acc, curr, idx) => {
              const price = pathOr(1, [curr, currency.toLowerCase()], prices);
              const totalAssets = new BigDecimal(
                (tvls?.[idx] as unknown as BigNumberish) ?? constants.One,
                decimals?.[idx] ?? 18,
              ).simple;
              const currPrice = totalAssets * Number(price);

              return acc + currPrice;
            }, 0),
      isLoading: assetLoading || tvlsLoading || decimalsLoading || priceLoading,
    }),
    [
      assetLoading,
      assets,
      currency,
      decimals,
      decimalsLoading,
      priceLoading,
      prices,
      tvls,
      tvlsLoading,
    ],
  );
};
