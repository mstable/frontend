import {
  HoverablePrimaryCard,
  MVIcon,
  ProtocolIcon,
  ValueLabel,
} from '@frontend/shared-ui';
import {
  Avatar,
  AvatarGroup,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import { LineChart } from '../../LineChart';
import { useVaultCardProps } from '../hooks';

import type { VaultCardProps } from '../types';

export const FeaturedVaultCard = (props: VaultCardProps) => {
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
      p={2}
      primaryColor={metavault.primaryColor}
      {...rest}
      onClick={handleClick}
      sx={{ cursor: onClick || to ? 'pointer' : 'inherit', ...rest?.sx }}
      role={onClick || to ? 'button' : 'presentation'}
    >
      <MVIcon
        address={metavault.address}
        sx={{ height: 40, width: 40, mb: 2, ml: '-6px' }}
      />
      <Typography variant="h5" mb={2}>
        {metavault.name}
      </Typography>
      <Stack direction="row" mb={4} flexWrap="wrap" columnGap={1} rowGap={2}>
        {metavault.tags.map((tag, idx) => (
          <Typography key={`tag-${idx}`} {...tagProps}>
            {intl.formatMessage(tag)}
          </Typography>
        ))}
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <ValueLabel
          disableResponsive
          label={sharePriceLabel}
          hint={sharePriceHint}
        >
          <Typography variant="value3">
            {isLoading ? <Skeleton width={75} /> : sharePrice}
          </Typography>
        </ValueLabel>
        {isLoading ? (
          <Skeleton height={60} width={100} variant="rounded" />
        ) : (
          <LineChart id={metavault.id} {...chartData} height={60} width={100} />
        )}
      </Stack>
      <Divider flexItem sx={{ my: 3 }} />
      <ValueLabel
        label={roiLabel}
        hint={roiHint}
        components={{ container: { width: 1 } }}
      >
        <Typography variant="value3">
          {assetLoading ? <Skeleton width={50} /> : roi}
        </Typography>
      </ValueLabel>
      <ValueLabel label={tvlLabel} hint={tvlHint}>
        <Stack direction="row" spacing={1} alignItems="baseline">
          <Typography variant="value3">
            {assetLoading ? <Skeleton width={50} /> : tvl}
          </Typography>
        </Stack>
      </ValueLabel>
      <ValueLabel
        label={intl.formatMessage({
          defaultMessage: 'Protocols',
          id: 'zFNxtv',
        })}
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
    </HoverablePrimaryCard>
  );
};
