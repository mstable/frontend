import { isNilOrEmpty } from '@frontend/shared-utils';
import { Stack, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';
import type { ChartData, ChartOptions } from 'chart.js';

export type LineChartProps = {
  data: ChartData<'line'>;
  options: ChartOptions<'line'>;
} & StackProps;

export const LineChart = ({ data, options, ...rest }: LineChartProps) => {
  const intl = useIntl();

  return (
    <Stack {...rest} position="relative">
      <Line options={options} data={data} />
      {isNilOrEmpty(data?.labels) && (
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
            borderTop={`2px dashed ${data.datasets[0].pointBackgroundColor}`}
            flex={1}
          />
          <Typography
            variant="value5"
            color={data.datasets[0].pointBackgroundColor as string}
            mx={1}
          >
            {intl.formatMessage({ defaultMessage: 'No Data Available' })}
          </Typography>
          <Stack
            borderTop={`2px dashed ${data.datasets[0].pointBackgroundColor}`}
            flex={1}
          />
        </Stack>
      )}
    </Stack>
  );
};
