import { MVIcon, ProtocolIcon, ValueLabel } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import {
  Avatar,
  AvatarGroup,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { constants } from 'ethers';
import { useIntl } from 'react-intl';

import { useChartData, useMetavaultData } from '../hooks';
import { HoverableCard } from './HoverableCard';
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

export const VaultCard = ({ metavault, to }: Props) => {
  const intl = useIntl();
  const data = useMetavaultData(metavault.address);
  const chartData = useChartData(metavault.address);

  return (
    <HoverableCard primaryColor={metavault.primaryColor} to={to}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <MVIcon
            address={metavault.address}
            sx={{ height: 42, width: 42, mb: 2 }}
          />
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'APY' })}
            hint={intl.formatMessage({
              defaultMessage: 'Annual Percentage Yield',
            })}
          >
            <Typography variant="value2">
              {intl.formatNumber(data?.apy ?? 0, {
                style: 'percent',
                maximumFractionDigits: 2,
              })}
            </Typography>
          </ValueLabel>
        </Stack>
        <LineChart {...chartData} />
        <Typography variant="h4" mt={5}>
          {metavault.name}
        </Typography>
        <Stack direction="row" spacing={1} mt={2} mb={3}>
          {metavault.tags.map((tag, idx) => (
            <Typography key={`tag-${idx}`} {...tagProps}>
              {intl.formatMessage(tag)}
            </Typography>
          ))}
        </Stack>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 3, md: 4 }}
        >
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Protocols' })}
            components={{ valueContainer: { pb: 0.3 } }}
          >
            <AvatarGroup max={6}>
              {metavault.strategies.map((strat) => (
                <Avatar key={strat.protocol.id}>
                  <ProtocolIcon
                    name={strat.protocol.id}
                    sx={{ height: 18, width: 18 }}
                  />
                </Avatar>
              ))}
            </AvatarGroup>
          </ValueLabel>
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'TVL' })}
            hint={intl.formatMessage({ defaultMessage: 'Total Value Locked' })}
          >
            <Stack direction="row" spacing={1} alignItems="baseline">
              <Typography variant="value3">
                {intl.formatNumber(
                  new BigDecimal(
                    data?.totalAssets ?? constants.Zero,
                    metavault.assetDecimals,
                  ).simple,
                  { notation: 'compact' },
                )}
              </Typography>
            </Stack>
          </ValueLabel>
        </Stack>
      </CardContent>
    </HoverableCard>
  );
};
