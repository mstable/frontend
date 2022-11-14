import { useMemo } from 'react';

import { supportedMetavaults } from '@frontend/shared-constants';
import { useDataSource } from '@frontend/shared-data-access';
import { useGetPrices, usePrices } from '@frontend/shared-prices';
import { BigDecimal } from '@frontend/shared-utils';
import { alpha } from '@mui/material';
import { pathOr, propEq, sort } from 'ramda';
import { useIntl } from 'react-intl';
import {
  chainId,
  erc20ABI,
  erc4626ABI,
  useContractRead,
  useContractReads,
  useNetwork,
} from 'wagmi';

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

export const useChartData = (address: HexAddress, isSmallChart?: boolean) => {
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
              borderWidth: isSmallChart ? 2 : 3,
              backgroundColor: 'transparent',
              fill: true,
              pointBackgroundColor: '#2775CA',
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
    }, [data?.DailyVaultStats, intl, isSmallChart]);

  return chartData;
};

export const useAssetDecimal = (address: HexAddress) => {
  const { data: asset } = useContractRead({
    address,
    abi: erc4626ABI,
    functionName: 'asset',
  });

  return useContractRead({
    address: asset as HexAddress,
    abi: erc20ABI,
    functionName: 'decimals',
  });
};

export const useTotalTvl = () => {
  const dataSource = useDataSource();
  const { data } = useMetavaultsQuery(dataSource);
  const { chain } = useNetwork();
  const { currency } = usePrices();
  const metavaults = supportedMetavaults[chain?.id || chainId.mainnet];
  const { data: assets } = useContractReads({
    contracts: metavaults.map((mv) => ({
      address: mv.address,
      abi: erc4626ABI,
      functionName: 'asset',
    })),
  });
  const { data: decimals } = useContractReads({
    contracts: assets?.map((asset) => ({
      address: asset as HexAddress,
      abi: erc20ABI,
      functionName: 'decimals',
    })),
  });
  const { data: prices } = useGetPrices(assets as HexAddress[]);

  return useMemo(
    () =>
      data?.vaults.reduce((acc, curr, idx) => {
        const price = pathOr(1, [curr.address, currency.toLowerCase()], prices);
        const totalAssets = new BigDecimal(
          curr.totalAssets,
          decimals?.[idx] ?? 18,
        ).simple;
        const currPrice = totalAssets * Number(price);

        return acc + currPrice;
      }, 0),
    [currency, data?.vaults, decimals, prices],
  );
};
