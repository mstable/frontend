import { alpha, Card, CardContent, CardHeader, useTheme } from '@mui/material';
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
import { Line } from 'react-chartjs-2';
import { useIntl } from 'react-intl';

import type { Theme } from '@mui/material';
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

    gradient?.addColorStop(0, tone);
    gradient?.addColorStop(0.5, alpha(tone, 0.4));
    gradient?.addColorStop(1, alpha(tone, 0.0));

    return gradient;
  };

const options: ChartOptions<'line'> = {
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
      // defining min and max so hiding the dataset does not change scale range
      min: 0,
      max: 30,
      ticks: {
        // Include a dollar sign in the ticks
        callback: (value, index, ticks) => `${value}k`,
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
};

const getData = (theme: Theme): ChartData<'line'> => ({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'data1',
      data: [18, 20, 24, 11, 8, 12, 19],
      borderColor: theme.palette.primary.main,
      backgroundColor: getBackgroundColor(theme.palette.primary.main),
      fill: true,
    },
    {
      label: 'data1',
      data: [11, 14, 18, 26, 10, 8, 16],
      borderColor: theme.palette.grey['200'],
      backgroundColor: getBackgroundColor(theme.palette.grey['200']),
      fill: true,
    },
  ],
});

export const VaultPerformance = () => {
  const intl = useIntl();
  const theme = useTheme();

  return (
    <Card sx={{ backgroundColor: 'transparent', border: 'none', boxShadow: 0 }}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Vault Performance' })}
      />
      <CardContent>
        <Line key="chart" options={options} data={getData(theme)} />
      </CardContent>
    </Card>
  );
};
