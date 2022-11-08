import { MVIcon, ProtocolIcon } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import {
  Avatar,
  AvatarGroup,
  Skeleton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-location';
import { constants } from 'ethers';
import { useIntl } from 'react-intl';

import { useAssetDecimal, useChartData, useMetavaultData } from '../hooks';
import { LineChart } from './LineChart';

import type { Metavault } from '@frontend/shared-constants';
import type { TypographyProps } from '@mui/material';

interface Props {
  metavault: Metavault;
  to: string;
}

const tagProps: TypographyProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'medium',
  fontSize: 12,
  px: 1,
  height: 20,
  noWrap: true,
  bgcolor: (theme) => theme.palette.background.highlight,
  borderRadius: 2,
};

export const VaultTableRow = ({ metavault, to }: Props) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const data = useMetavaultData(metavault.address);
  const chartData = useChartData(metavault.address, true);
  const { data: assetDecimal, isLoading: assetLoading } = useAssetDecimal(
    metavault.address,
  );

  return (
    <TableRow hover onClick={() => navigate({ to })}>
      <TableCell>
        <MVIcon address={metavault.address} sx={{ height: 32, width: 32 }} />
      </TableCell>
      <TableCell>
        <Typography variant="value4">{metavault.name}</Typography>
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing={1}>
          {metavault.tags.map((tag, idx) => (
            <Typography key={`tag-${idx}`} {...tagProps}>
              {intl.formatMessage(tag)}
            </Typography>
          ))}
        </Stack>
      </TableCell>
      <TableCell>
        <AvatarGroup max={6}>
          {metavault.strategies.map((strat) => (
            <Avatar key={strat.protocol.id}>
              <ProtocolIcon
                name={strat.protocol.id}
                sx={{ height: 24, width: 24 }}
              />
            </Avatar>
          ))}
        </AvatarGroup>
      </TableCell>
      <TableCell>
        <Typography variant="value4">
          {assetLoading ? (
            <Skeleton width={50} />
          ) : (
            intl.formatNumber(
              new BigDecimal(
                data?.totalAssets ?? constants.Zero,
                assetDecimal ?? 18,
              ).simple,
              { notation: 'compact' },
            )
          )}
        </Typography>
      </TableCell>
      <TableCell>
        <Stack direction="row">
          <Typography variant="value4">
            {intl.formatNumber(data?.apy ?? 0, {
              style: 'percent',
              maximumFractionDigits: 2,
            })}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack sx={{ width: 60, height: 40 }}>
          <LineChart
            options={{ ...chartData.options, maintainAspectRatio: false }}
            data={chartData.data}
            height={40}
            width={60}
          />
        </Stack>
      </TableCell>
    </TableRow>
  );
};
