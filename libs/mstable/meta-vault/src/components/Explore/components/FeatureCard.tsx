import { MVIcon, ProtocolIcon, ValueLabel } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import {
  Avatar,
  AvatarGroup,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { constants } from 'ethers';
import { StarFour } from 'phosphor-react';
import { Line } from 'react-chartjs-2';
import { useIntl } from 'react-intl';

import { useChartData } from '../hooks';
import { HoverableCard } from './HoverableCard';

import type { Metavault } from '@frontend/shared-constants';
import type { TypographyProps } from '@mui/material';

import type { MetavaultQuery } from '../../../queries.generated';

interface Props {
  metavault: Metavault;
  data: MetavaultQuery;
  to: string;
}

const tagProps: TypographyProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'medium',
  fontSize: 14,
  px: 1,
  height: 30,
  noWrap: true,
  bgcolor: (theme) => theme.palette.background.highlight,
  borderRadius: 2,
};

export const FeatureCard = ({ metavault, data, to }: Props) => {
  const intl = useIntl();
  const chartData = useChartData(data);
  return (
    <HoverableCard
      transparentBackground
      primaryColor={metavault.primaryColor}
      to={to}
    >
      <CardContent sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item sm={5} xs={12}>
            <Stack
              direction="row"
              spacing={1}
              color="text.secondary"
              alignItems="center"
              mb={4}
            >
              <StarFour weight="fill" />
              <Typography variant="h5" color="text.secondary">
                {intl.formatMessage({ defaultMessage: 'Featured' })}
              </Typography>
            </Stack>
            <MVIcon
              address={metavault.address}
              sx={{ height: 80, width: 80, mb: 2 }}
            />
            <Typography variant="h2">{metavault.name}</Typography>
            <Stack direction="row" spacing={1} mt={2} mb={4}>
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
                        sx={{ height: 24, width: 24 }}
                      />
                    </Avatar>
                  ))}
                </AvatarGroup>
              </ValueLabel>
              <ValueLabel
                label={intl.formatMessage({ defaultMessage: 'TVL' })}
                hint={intl.formatMessage({ defaultMessage: 'Total Supply' })}
              >
                <Stack direction="row" spacing={1} alignItems="baseline">
                  <Typography variant="value2">
                    {intl.formatNumber(
                      new BigDecimal(
                        data?.vault?.totalAssets ?? constants.Zero,
                        metavault.assetDecimals,
                      ).simple,
                      { notation: 'compact' },
                    )}
                  </Typography>
                </Stack>
              </ValueLabel>
              <ValueLabel
                label={intl.formatMessage({ defaultMessage: 'APY' })}
                hint={intl.formatMessage({
                  defaultMessage: 'Annual Percentage Yield',
                })}
              >
                <Typography variant="value2">
                  {intl.formatNumber(data?.vault?.apy ?? 0, {
                    style: 'percent',
                    maximumFractionDigits: 2,
                  })}
                </Typography>
              </ValueLabel>
            </Stack>
          </Grid>
          <Grid item sm={7} xs={12}>
            <Line options={chartData.options} data={chartData.data} />
          </Grid>
        </Grid>
      </CardContent>
    </HoverableCard>
  );
};
