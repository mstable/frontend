import { HoverablePrimaryCard, MVIcon, ValueLabel } from '@frontend/shared-ui';
import { Skeleton, Stack, Typography } from '@mui/material';

import { useCoreVaultCardProps } from '../hooks';

import type { CoreVaultCardProps } from '../types';

export const MobileVaultCard = (props: CoreVaultCardProps) => {
  const {
    isLoading,
    handleClick,
    tokenPriceLabel,
    tokenPriceHint,
    tokenPrice,
    apyLabel,
    apyHint,
    apy,
    tvlLabel,
    tvlHint,
    tvl,
    name,
    tagProps,
  } = useCoreVaultCardProps(props);
  const { config, to, ...rest } = props;

  return (
    <HoverablePrimaryCard
      direction="column"
      p={3}
      primaryColor="#2775CA"
      {...rest}
      onClick={handleClick}
      sx={{ cursor: 'pointer', ...rest?.sx }}
      role="button"
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <MVIcon
          address={config.address}
          sx={{ height: 40, width: 40, mb: 2, ml: '-6px' }}
        />
        <ValueLabel
          disableResponsive
          label={tokenPriceLabel}
          hint={tokenPriceHint}
        >
          <Typography variant="value3">
            {isLoading ? <Skeleton width={75} /> : tokenPrice}
          </Typography>
        </ValueLabel>
      </Stack>
      <Skeleton height="100%" width="100%" variant="rounded" sx={{ mb: 2 }} />
      <Typography variant="h4" mb={2}>
        {name}
      </Typography>
      <Stack direction="row" mb={4} flexWrap="wrap" columnGap={1} rowGap={2}>
        <Typography {...tagProps}>{config.symbol}</Typography>
      </Stack>
      <Stack
        direction="row"
        sx={(theme) => ({
          border: `1px solid ${theme.palette.divider}`,
          justifyContent: 'space-between',
          borderRadius: 1,
          padding: 2,
          mt: 'auto',
        })}
      >
        <ValueLabel disableResponsive label={apyLabel} hint={apyHint}>
          <Typography variant="value3">
            {isLoading ? <Skeleton width={50} /> : apy}
          </Typography>
        </ValueLabel>
        <ValueLabel disableResponsive label={tvlLabel} hint={tvlHint}>
          <Stack direction="row" spacing={1} alignItems="baseline">
            <Typography variant="value3">
              {isLoading ? <Skeleton width={50} /> : tvl}
            </Typography>
          </Stack>
        </ValueLabel>
      </Stack>
    </HoverablePrimaryCard>
  );
};
