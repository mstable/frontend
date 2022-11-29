import { useState } from 'react';

import { Dialog } from '@frontend/shared-ui';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useSearch } from '@tanstack/react-location';
import { FrameCorners } from 'phosphor-react';
import { Line } from 'react-chartjs-2';
import { useIntl } from 'react-intl';

import { Controls } from './components/Controls';
import { useChartConfig, useChartData } from './hooks';

import type { MvGenerics } from '../../types';

export const VaultPerformance = () => {
  const intl = useIntl();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [expand, setExpand] = useState(false);
  const { defaultChartTimeframe, defaultChartType } = useChartConfig();
  const {
    chartType = defaultChartType,
    chartTimeframe = defaultChartTimeframe,
  } = useSearch<MvGenerics>();
  const chartData = useChartData(chartTimeframe, chartType);

  return (
    <Card sx={{ backgroundColor: 'transparent', border: 'none', boxShadow: 0 }}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Vault Performance' })}
        sx={{ paddingLeft: 0 }}
        action={
          !isMobile && (
            <Button
              onClick={() => setExpand(true)}
              color="secondary"
              startIcon={<FrameCorners />}
              size="small"
            >
              {intl.formatMessage({ defaultMessage: 'Expand' })}
            </Button>
          )
        }
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
            <Controls />
            <Line
              key="chart"
              options={chartData.options}
              data={chartData.data}
              height="100%"
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
