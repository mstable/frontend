import { metavaults } from '@frontend/shared-constants';
import { isNilOrEmpty } from '@frontend/shared-utils';
import { Stack, Typography } from '@mui/material';
import { propEq } from 'ramda';
import { Line } from 'react-chartjs-2';
import { useIntl } from 'react-intl';
import { mainnet } from 'wagmi/chains';

import type { SupportedMetavault } from '@frontend/shared-constants';
import type { StackProps } from '@mui/material';
import type { ChartData, ChartOptions } from 'chart.js';

export type LineChartProps = {
  id: SupportedMetavault;
  data: ChartData<'line'>;
  options: ChartOptions<'line'>;
  width?: string | number;
  height?: string | number;
} & StackProps;

export const LineChart = ({
  id,
  data,
  options,
  width,
  height,
  ...rest
}: LineChartProps) => {
  const intl = useIntl();
  const color = metavaults[mainnet.id].find(propEq(id, 'id'))?.primaryColor;

  return (
    <Stack {...rest} position="relative">
      <Line width={width} height={height} options={options} data={data} />
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
          <Stack borderTop={`2px dashed ${color}`} flex={1} />
          <Typography variant="value5" color={color} mx={1}>
            {intl.formatMessage({
              defaultMessage: 'No Data Available',
              id: 'Imiiiv',
            })}
          </Typography>
          <Stack borderTop={`2px dashed ${color}`} flex={1} />
        </Stack>
      )}
    </Stack>
  );
};
