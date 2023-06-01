import { formatToUsd } from '@dhedge/core-ui-kit/utils';
import { useFundQuery } from '@frontend/mstable-vault';
import { useChartConfig, useChartData } from '@frontend/shared-hooks';
import { TokenIconRevamp } from '@frontend/shared-ui';
import {
  Stack,
  TableCell,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-location';

import { CoreVaultLineChart } from './CoreVaultLineChart';

import type { PoolConfig } from '@dhedge/core-ui-kit/types';

interface VaultTableRowProps {
  config: PoolConfig;
  to: string;
  isLast?: boolean;
}

export const CoreVaultTableRow = ({
  config,
  to,
  isLast,
}: VaultTableRowProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { data } = useFundQuery({ address: config.address });
  const { defaultChartType, defaultChartPeriod } = useChartConfig();
  const chartData = useChartData({
    address: config.address,
    chartType: defaultChartType,
    chartPeriod: defaultChartPeriod,
    scales: false,
  });

  return (
    <TableRow
      sx={{ cursor: 'pointer', borderBottom: isLast ? 'none' : undefined }}
      hover
      onClick={() => {
        navigate({ to });
      }}
    >
      <TableCell>
        <TokenIconRevamp
          symbols={[config.symbol]}
          sx={{ height: 32, width: 32 }}
        />
      </TableCell>
      <TableCell>
        <Typography variant="value4">{data?.fund.name}</Typography>
      </TableCell>
      {!isMobile && <TableCell>-</TableCell>}
      {!isMobile && <TableCell>-</TableCell>}
      {!isMobile && (
        <TableCell>
          <Typography variant="value4">
            {formatToUsd({
              value: data?.fund.totalValue ? +data?.fund.totalValue : 0,
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
              normalize: true,
            })}
          </Typography>
        </TableCell>
      )}
      <TableCell>
        <Stack direction="row">
          <Typography variant="value4">-</Typography>
        </Stack>
      </TableCell>
      {!isMobile && (
        <TableCell>
          <Stack sx={{ width: 60, height: 40 }}>
            <CoreVaultLineChart
              options={{ ...chartData.options, maintainAspectRatio: false }}
              data={chartData.data}
              height={40}
              width={60}
            />
          </Stack>
        </TableCell>
      )}
    </TableRow>
  );
};
