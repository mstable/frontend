import { usePrices } from '@frontend/shared-prices';
import {
  HoverablePrimaryCard,
  MVIcon,
  ProtocolIcon,
  ValueLabel,
} from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import {
  Avatar,
  AvatarGroup,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-location';
import { constants } from 'ethers';
import { useIntl } from 'react-intl';

import { useAssetDecimal, useChartData, useMetavaultData } from '../hooks';
import { LineChart } from './LineChart';

import type { Metavault } from '@frontend/shared-constants';
import type { CardProps, TypographyProps } from '@mui/material';

export type VaultCardProps = {
  metavault: Metavault;
  onClick?: (mvid: string) => void;
  to?: string;
} & Omit<CardProps, 'children' | 'onClick'>;

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

export const VaultCard = ({
  metavault,
  onClick,
  to,
  ...rest
}: VaultCardProps) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { currency } = usePrices();
  const data = useMetavaultData(metavault.address);
  const chartData = useChartData(metavault.address);
  const { data: assetDecimal, isLoading: assetLoading } = useAssetDecimal(
    metavault.address,
  );

  const handleClick = () => {
    if (onClick) {
      onClick(metavault.id);
    }
    if (to) {
      navigate({ to });
    }
  };

  return (
    <HoverablePrimaryCard
      primaryColor={metavault.primaryColor}
      {...rest}
      onClick={handleClick}
      sx={{ cursor: onClick || to ? 'pointer' : 'inherit', ...rest?.sx }}
      role={onClick || to ? 'button' : 'presentation'}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <MVIcon
            address={metavault.address}
            sx={{ height: 53, width: 53, mb: 2, ml: '-6px' }}
          />
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Performance' })}
            components={{
              label: { sx: { mb: 0.5 } },
              container: { alignItems: 'flex-end' },
            }}
            hint={intl.formatMessage({
              defaultMessage: 'Asset per share price.',
            })}
          >
            <Typography variant="value2">
              {intl.formatNumber(data?.assetPerShare ?? 0, {
                maximumFractionDigits: 2,
                style: 'currency',
                currency,
              })}
            </Typography>
          </ValueLabel>
        </Stack>
        <LineChart id={metavault.id} {...chartData} />
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
            components={{
              valueContainer: { pb: 0.3 },
              label: { sx: { mb: 0.5 } },
            }}
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
            components={{
              label: { sx: { mb: 0.5 } },
            }}
          >
            <Stack direction="row" spacing={1} alignItems="baseline">
              <Typography variant="value3">
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
            </Stack>
          </ValueLabel>
        </Stack>
      </CardContent>
    </HoverablePrimaryCard>
  );
};
