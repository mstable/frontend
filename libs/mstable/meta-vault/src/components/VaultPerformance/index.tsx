/* eslint-disable react/prop-types */
import { useMemo, useState } from 'react';

import { useDataSource } from '@frontend/shared-data-access';
import { Dialog } from '@frontend/shared-ui';
import {
  alpha,
  Button,
  Card,
  CardContent,
  CardHeader,
  useTheme,
} from '@mui/material';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { intlFormat } from 'date-fns';
import { FrameCorners } from 'phosphor-react';
import { sort } from 'ramda';
import { Line } from 'react-chartjs-2';
import { useIntl } from 'react-intl';

import { useMetavaultQuery } from '../../queries.generated';
import { useMetavault } from '../../state';
import { Controls } from './components/Controls';
import { useChartConfig } from './hooks';

import type { ChartData, ChartOptions, ScriptableContext } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

const getBackgroundColor =
  (tone: string) => (ctx: ScriptableContext<'line'>) => {
    const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);

    gradient?.addColorStop(0, alpha(tone, 0.8));
    gradient?.addColorStop(0.25, alpha(tone, 0.4));
    gradient?.addColorStop(0.5, alpha(tone, 0.0));

    return gradient;
  };

export const VaultPerformance = () => {
  const intl = useIntl();
  const theme = useTheme();
  const [expand, setExpand] = useState(false);
  const { chartTypes, chartTimeframes } = useChartConfig();
  const [chartType, setChartType] = useState('APY');
  const [chartTimeframe, setChartTimeframe] = useState('1W');
  const {
    metavault: { address },
  } = useMetavault();
  const dataSource = useDataSource();
  const { data } = useMetavaultQuery(
    dataSource,
    {
      id: address,
      days: chartTimeframes[chartTimeframe].days,
    },
    { enabled: !!address },
  );
  const chartData: { data: ChartData<'line'>; options: ChartOptions<'line'> } =
    useMemo(() => {
      const sortedData = sort(
        (a, b) => Number(a.timestamp) - Number(b.timestamp),
        data?.vault?.DailyVaultStats || [],
      );

      return {
        data: {
          labels: sortedData.map((d) =>
            intlFormat(Number(d.timestamp) * 1000, {
              timeZone: 'UTC',
              month: 'numeric',
              day: 'numeric',
            }),
          ),
          datasets: [
            {
              label: 'data1',
              data: sortedData.map(chartTypes[chartType].getValue),
              borderColor: theme.palette.info.main,
              backgroundColor: getBackgroundColor(theme.palette.info.light),
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          datasets: {
            line: {
              tension: 0.5,
              pointRadius: 0,
            },
          },
          scales: {
            y: {
              grid: {
                display: false,
              },
              min: 0,
              ticks: {
                callback: chartTypes[chartType].getLabel,
              },
            },
            x: {
              grid: {
                display: false,
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
          },
        },
      };
    }, [data, theme, chartTypes, chartType]);

  return (
    <Card sx={{ backgroundColor: 'transparent', border: 'none', boxShadow: 0 }}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Vault Performance' })}
        action={
          <Button
            onClick={() => setExpand(true)}
            color="secondary"
            startIcon={<FrameCorners />}
            size="small"
          >
            {intl.formatMessage({ defaultMessage: 'Expand' })}
          </Button>
        }
      />
      <CardContent>
        <Controls
          chartType={chartType}
          setChartType={setChartType}
          chartTimeframe={chartTimeframe}
          setChartTimeframe={setChartTimeframe}
        />
        <Line key="chart" options={chartData.options} data={chartData.data} />
      </CardContent>
      <Dialog
        maxWidth="lg"
        fullWidth
        open={expand}
        onClose={() => {
          setExpand(false);
        }}
        title={intl.formatMessage({ defaultMessage: 'Vault Performance' })}
        content={
          <>
            <Controls
              chartType={chartType}
              setChartType={setChartType}
              chartTimeframe={chartTimeframe}
              setChartTimeframe={setChartTimeframe}
            />
            <Line
              key="chart"
              options={chartData.options}
              data={chartData.data}
            />
          </>
        }
        actions={(onClose) => (
          <Button color="secondary" onClick={onClose}>
            {intl.formatMessage({ defaultMessage: 'Close' })}
          </Button>
        )}
      />
    </Card>
  );
};
