import { Stack, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { useIntl } from 'react-intl';

import { useChartData } from '../hooks';

import type { MetavaultQuery } from '../../../queries.generated';

export const LineChart = ({ data }: { data: MetavaultQuery }) => {
  const chartData = useChartData(data);
  const intl = useIntl();
  return (
    <Stack position="relative">
      <Line options={chartData.options} data={chartData.data} />
      {chartData.data.labels.length === 0 ? (
        <Stack
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          direction="row"
          alignItems="center"
        >
          <Stack
            borderTop={`2px dashed ${chartData.data.datasets[0].pointBackgroundColor}`}
            flex={1}
          />
          <Typography
            variant="value5"
            color={chartData.data.datasets[0].pointBackgroundColor as string}
            mx={1}
          >
            {intl.formatMessage({ defaultMessage: 'No Data Available' })}
          </Typography>
          <Stack
            borderTop={`2px dashed ${chartData.data.datasets[0].pointBackgroundColor}`}
            flex={1}
          />
        </Stack>
      ) : null}
    </Stack>
  );
};
