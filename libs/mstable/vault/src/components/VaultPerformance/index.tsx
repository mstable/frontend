import {
  useChartConfig,
  useChartData,
  useIsMobile,
} from '@frontend/shared-hooks';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useSearch } from '@tanstack/react-location';
import { Line } from 'react-chartjs-2';
import { useIntl } from 'react-intl';

import { Controls } from './components/Controls';

import type { Address } from '@dhedge/core-ui-kit/types';

import type { VaultRoute } from '../../types';

interface VaultPerformanceProps {
  address: Address;
}

export const VaultPerformance = ({ address }: VaultPerformanceProps) => {
  const intl = useIntl();
  const isMobile = useIsMobile();
  const { defaultChartPeriod, defaultChartType } = useChartConfig();
  const { chartType = defaultChartType, chartPeriod = defaultChartPeriod } =
    useSearch<VaultRoute>();
  const chartData = useChartData({ address, chartPeriod, chartType });

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
