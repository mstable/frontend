import {
  Card,
  CardContent,
  CardHeader,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useSearch } from '@tanstack/react-location';
import { Line } from 'react-chartjs-2';
import { useIntl } from 'react-intl';

import { Controls } from './components/Controls';
import { useChartConfig, useChartData } from './hooks';

import type { VaultRoute } from '../../types';

export const VaultPerformance = () => {
  const intl = useIntl();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { defaultChartPeriod, defaultChartType } = useChartConfig();
  const { chartType = defaultChartType, chartPeriod = defaultChartPeriod } =
    useSearch<VaultRoute>();
  const chartData = useChartData(chartPeriod, chartType);

  return (
    <Card sx={{ backgroundColor: 'transparent', border: 'none', boxShadow: 0 }}>
      <CardHeader
        title={intl.formatMessage({
          defaultMessage: 'Vault Performance',
          id: 'MqZGhr',
        })}
        sx={{ paddingLeft: 0 }}
      />
      <CardContent sx={{ paddingLeft: 0 }}>
        <Controls />
        <Line
          height={isMobile ? 240 : undefined}
          key="chart"
          options={chartData.options}
          data={chartData.data}
        />
      </CardContent>
    </Card>
  );
};
