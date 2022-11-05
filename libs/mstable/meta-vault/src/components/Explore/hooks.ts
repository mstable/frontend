import { useMemo } from 'react';

import { supportedMetavaults } from '@frontend/shared-constants';
import { useDataSource } from '@frontend/shared-data-access';
import { BigDecimal } from '@frontend/shared-utils';
import { alpha } from '@mui/material';
import { propEq, sort } from 'ramda';
import { useIntl } from 'react-intl';
import { chainId, useNetwork } from 'wagmi';

import { useMetavaultsQuery } from '../../queries.generated';

import type { HexAddress } from '@frontend/shared-utils';
import type { ChartArea, ChartData, ChartOptions } from 'chart.js';

export const useMetavaultData = (address: HexAddress) => {
  const dataSource = useDataSource();
  const { data: vaultsData } = useMetavaultsQuery(dataSource);

  return useMemo(
    () => vaultsData?.vaults?.find(propEq('address', address)),
    [address, vaultsData?.vaults],
  );
};

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

export const useChartData = (address: HexAddress) => {
  const intl = useIntl();
  const data = useMetavaultData(address);

  const chartData: { data: ChartData<'line'>; options: ChartOptions<'line'> } =
    useMemo(() => {
      const sortedData = sort(
        (a, b) => Number(a.timestamp) - Number(b.timestamp),
        data?.DailyVaultStats || [],
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
    }, [data?.DailyVaultStats, intl]);

  return chartData;
};

export const useTotalTvl = () => {
  const dataSource = useDataSource();
  const { data } = useMetavaultsQuery(dataSource);
  const { chain } = useNetwork();
  const metavaults = supportedMetavaults[chain?.id || chainId.mainnet];

  // TODO: calculate TVL in dollar value
  return useMemo(
    () =>
      data?.vaults?.reduce((acc, curr) => {
        const dec = metavaults.find(
          propEq('address', curr.address),
        ).assetDecimals;

        return acc + new BigDecimal(curr.totalAssets, dec).simple;
      }, 0),
    [data?.vaults, metavaults],
  );
};
