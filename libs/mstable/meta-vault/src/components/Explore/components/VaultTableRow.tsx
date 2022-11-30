import { useDataSource } from '@frontend/mstable-shared-data-access';
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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-location';
import { constants } from 'ethers';
import { useIntl } from 'react-intl';
import { erc20ABI, erc4626ABI, useContractRead } from 'wagmi';

import { useMetavaultQuery } from '../../../queries.generated';
import { useChartData } from '../hooks';
import { LineChart } from './LineChart';

import type { Metavault } from '@frontend/shared-constants';
import type { HexAddress } from '@frontend/shared-utils';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const dataSource = useDataSource();
  const { data } = useMetavaultQuery(dataSource, {
    id: metavault.address,
    firstBlock: metavault.firstBlock,
  });
  const chartData = useChartData(metavault.address, true);
  const { data: asset } = useContractRead({
    address: metavault.address,
    abi: erc4626ABI,
    functionName: 'asset',
  });
  const { data: assetDecimal, isLoading: assetLoading } = useContractRead({
    address: asset as HexAddress,
    abi: erc20ABI,
    functionName: 'decimals',
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
            {assetLoading ? (
              <Skeleton width={50} />
            ) : (
              intl.formatNumber(
                new BigDecimal(
                  data?.vault?.totalAssets ?? constants.Zero,
                  assetDecimal ?? 18,
                ).simple,
                { notation: 'compact' },
              )
            )}
          </Typography>
        </TableCell>
      )}
      <TableCell>
        <Stack direction="row">
          <Typography variant="value4">
            {intl.formatNumber(
              data?.vault?.assetPerShare /
                (data?.vault?.first?.[0]?.assetPerShare ?? 1) -
                1 ?? 0,
              {
                style: 'percent',
                minimumFractionDigits: 2,
              },
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
