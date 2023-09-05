import { useChartConfig, useIsMobile } from '@frontend/shared-hooks';
import { Box, Card, CardContent, CardHeader } from '@mui/material';
import { useSearch } from '@tanstack/react-location';
import { Line } from 'react-chartjs-2';
import { useIntl } from 'react-intl';

import { useChartData } from '../../hooks';
import { Controls } from './components/Controls';
import { TokenData } from './components/TokenData';

import type { FlatcoinRoute } from '../../types';

export const Performance = () => {
  const intl = useIntl();
  const isMobile = useIsMobile();
  const { defaultChartPeriod, defaultChartType } = useChartConfig();
  const { chartType = defaultChartType, chartPeriod = defaultChartPeriod } =
    useSearch<FlatcoinRoute>();
  const chartData = useChartData({ chartPeriod, chartType });

  return (
    <Card sx={{ backgroundColor: 'transparent', border: 'none', boxShadow: 0 }}>
      <CardHeader
        title={intl.formatMessage({
          defaultMessage: 'Performance',
          id: 'AA5h7P',
        })}
        sx={{ paddingLeft: 0 }}
      />
      <CardContent sx={{ paddingLeft: 0 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          mb={3}
        >
          <TokenData />
          <Controls />
        </Box>
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
