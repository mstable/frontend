import { useDataSource } from '@frontend/mstable-data-access';
import { useIsMobile } from '@frontend/shared-hooks';
import { MVIcon, ProtocolIcon } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import {
  Avatar,
  AvatarGroup,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-location';
import { constants } from 'ethers';
import { useIntl } from 'react-intl';

import { useMetavaultChartData } from '../hooks';
import { useMetavaultQuery } from '../queries.generated';
import { LineChart } from './LineChart';

import type { Metavault } from '@frontend/shared-constants';
import type { TypographyProps } from '@mui/material';

interface Props {
  metavault: Metavault;
  to: string;
  isLast?: boolean;
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

export const VaultTableRow = ({ metavault, to, isLast }: Props) => {
  const intl = useIntl();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const dataSource = useDataSource();
  const { data } = useMetavaultQuery(dataSource, {
    id: metavault.address,
    firstBlock: metavault.firstBlock,
  });
  const chartData = useMetavaultChartData(metavault, true);

  return (
    <TableRow
      sx={{ cursor: 'pointer', borderBottom: isLast ? 'none' : undefined }}
      hover
      onClick={() => {
        navigate({ to });
      }}
    >
      <TableCell>
        <MVIcon address={metavault.address} sx={{ height: 32, width: 32 }} />
      </TableCell>
      <TableCell>
        <Typography variant="value4">{metavault.name}</Typography>
      </TableCell>
      {!isMobile && (
        <TableCell>
          <Stack direction="row" flexWrap="wrap" columnGap={1} rowGap={1}>
            {metavault.tags.map((tag, idx) => (
              <Typography key={`tag-${idx}`} {...tagProps}>
                {intl.formatMessage(tag)}
              </Typography>
            ))}
          </Stack>
        </TableCell>
      )}
      {!isMobile && (
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
      )}
      {!isMobile && (
        <TableCell>
          <Typography variant="value4">
            {Intl.NumberFormat('en-US', { notation: 'compact' }).format(
              new BigDecimal(
                data?.vault?.totalAssets ?? constants.Zero,
                metavault.asset.decimals,
              ).simple,
            )}
          </Typography>
        </TableCell>
      )}
      <TableCell>
        <Stack direction="row">
          <Typography variant="value4">
            {Intl.NumberFormat('en-US', {
              style: 'percent',
              minimumFractionDigits: 2,
            }).format(
              data?.vault?.assetPerShare /
                (data?.vault?.first?.[0]?.assetPerShare ?? 1) -
                1 ?? 0,
            )}
          </Typography>
        </Stack>
      </TableCell>
      {!isMobile && (
        <TableCell>
          <Stack sx={{ width: 60, height: 40 }}>
            <LineChart
              id={metavault.id}
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
