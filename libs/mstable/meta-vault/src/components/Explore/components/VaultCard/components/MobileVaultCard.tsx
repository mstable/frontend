import {
  HoverablePrimaryCard,
  MVIcon,
  ProtocolIcon,
  ValueLabel,
} from '@frontend/shared-ui';
import {
  Avatar,
  AvatarGroup,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import { LineChart } from '../../LineChart';
import { useVaultCardProps } from '../hooks';

import type { VaultCardProps } from '../types';

export const MobileVaultCard = (props: VaultCardProps) => {
  const {
    intl,
    isLoading,
    chartData,
    assetLoading,
    handleClick,
    tagProps,
    sharePriceLabel,
    sharePriceHint,
    sharePrice,
    roiLabel,
    roiHint,
    roi,
    tvlLabel,
    tvlHint,
    tvl,
  } = useVaultCardProps(props);
  const { metavault, to, onClick, ...rest } = props;

  return (
    <HoverablePrimaryCard
      direction="column"
      p={3}
      primaryColor={metavault.primaryColor}
      {...rest}
      onClick={handleClick}
      sx={{ cursor: onClick || to ? 'pointer' : 'inherit', ...rest?.sx }}
      role={onClick || to ? 'button' : 'presentation'}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <MVIcon
          address={metavault.address}
          sx={{ height: 40, width: 40, mb: 2, ml: '-6px' }}
        />
        <ValueLabel
          disableResponsive
          label={sharePriceLabel}
          hint={sharePriceHint}
        >
          <Typography variant="value3">
            {isLoading ? <Skeleton width={75} /> : sharePrice}
          </Typography>
        </ValueLabel>
      </Stack>
      {isLoading ? (
        <Skeleton height={180} width={280} variant="rounded" />
      ) : (
        <LineChart id={metavault.id} {...chartData} height={180} width={280} />
      )}

      <Typography variant="h4" mb={2}>
        {metavault.name}
      </Typography>
      <Stack direction="row" mb={4} flexWrap="wrap" columnGap={1} rowGap={2}>
        {metavault.tags.map((tag, idx) => (
          <Typography key={`tag-${idx}`} {...tagProps}>
            {intl.formatMessage(tag)}
          </Typography>
        ))}
      </Stack>
      <Stack
        direction="row"
        sx={(theme) => ({
          border: `1px solid ${theme.palette.divider}`,
          justifyContent: 'space-between',
          borderRadius: 1,
          padding: 2,
        })}
      >
        <ValueLabel disableResponsive label={roiLabel} hint={roiHint}>
          <Typography variant="value3">
            {assetLoading ? <Skeleton width={50} /> : roi}
          </Typography>
        </ValueLabel>
        <ValueLabel disableResponsive label={tvlLabel} hint={tvlHint}>
          <Stack direction="row" spacing={1} alignItems="baseline">
            <Typography variant="value3">
              {assetLoading ? <Skeleton width={50} /> : tvl}
            </Typography>
          </Stack>
        </ValueLabel>
        <ValueLabel
          disableResponsive
          label={intl.formatMessage({ defaultMessage: 'Protocols' })}
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
      </Stack>
    </HoverablePrimaryCard>
  );
};
