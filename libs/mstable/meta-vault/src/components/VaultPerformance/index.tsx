import { useEffect } from 'react';

import { useTrack } from '@frontend/shared-analytics';
import { Dialog } from '@frontend/shared-ui';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate, useSearch } from '@tanstack/react-location';
import produce from 'immer';
import { FrameCorners } from 'phosphor-react';
import { Line } from 'react-chartjs-2';
import { useIntl } from 'react-intl';
import { useAccount, useNetwork } from 'wagmi';

import { useMetavault } from '../../state';
import { Controls } from './components/Controls';
import { useChartConfig, useChartData } from './hooks';

import type { MvRoute } from '../../types';

export const VaultPerformance = () => {
  const intl = useIntl();
  const theme = useTheme();
  const track = useTrack();
  const {
    metavault: { id },
  } = useMetavault();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { defaultChartTimeframe, defaultChartType } = useChartConfig();
  const {
    chartType = defaultChartType,
    chartTimeframe = defaultChartTimeframe,
    chartExpand = false,
  } = useSearch<MvRoute>();
  const navigate = useNavigate<MvRoute>();
  const chartData = useChartData(chartTimeframe, chartType);

  useEffect(() => {
    if (chartExpand) {
      track('view_expand_chart', {
        chartType,
        chartTimeframe,
        metavault: id,
        address: address ?? 'not_connected',
        chain: chain?.id,
      });
    }
  }, [address, chain?.id, chartExpand, chartTimeframe, chartType, id, track]);

  return (
    <Card sx={{ backgroundColor: 'transparent', border: 'none', boxShadow: 0 }}>
      <CardHeader
        title={intl.formatMessage({
          defaultMessage: 'Vault Performance',
          id: 'MqZGhr',
        })}
        sx={{ paddingLeft: 0 }}
        action={
          !isMobile && (
            <Button
              onClick={() => {
                navigate({
                  replace: true,
                  search: produce((draft) => {
                    draft.chartExpand = true;
                  }),
                });
              }}
              color="secondary"
              startIcon={<FrameCorners weight="regular" />}
              size="small"
            >
              {intl.formatMessage({ defaultMessage: 'Expand', id: '0oLj/t' })}
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
        open={chartExpand}
        onClose={() => {
          navigate({
            replace: true,
            search: produce((draft) => {
              draft.chartExpand = false;
            }),
          });
        }}
        title={intl.formatMessage({
          defaultMessage: 'Vault Performance',
          id: 'MqZGhr',
        })}
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
            {intl.formatMessage({ defaultMessage: 'Close', id: 'rbrahO' })}
          </Button>
        )}
      />
    </Card>
  );
};
