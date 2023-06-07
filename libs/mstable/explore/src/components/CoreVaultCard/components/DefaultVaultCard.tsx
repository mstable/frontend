import {
  HoverablePrimaryCard,
  TokenIconRevamp,
  ValueLabel,
} from '@frontend/shared-ui';
import { Skeleton, Stack, Typography } from '@mui/material';

import { CoreVaultLineChart } from '../../CoreVaultLineChart';
import { useCoreVaultCardProps } from '../hooks';

import type { CoreVaultCardProps } from '../types';

export const DefaultVaultCard = (props: CoreVaultCardProps) => {
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
    chartData,
    balance,
    balanceLabel,
    balanceHint,
  } = useCoreVaultCardProps(props);
  const { config, to, ...rest } = props;

  return (
    <HoverablePrimaryCard
      primaryColor={config.primaryColor}
      onClick={handleClick}
      sx={{ cursor: 'pointer', ...rest?.sx, width: '100%' }}
      role="button"
      p={3}
    >
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <TokenIconRevamp
          symbols={[config.symbol]}
          sx={{ height: 53, width: 53, mb: 2, ml: '-6px' }}
        />
        <ValueLabel
          label={tokenPriceLabel}
          hint={tokenPriceHint}
          components={{
            label: { sx: { mb: 0.5 } },
            container: { alignItems: 'flex-end' },
          }}
        >
          <Typography variant="value2">
            {isLoading ? <Skeleton width={75} /> : tokenPrice}
          </Typography>
        </ValueLabel>
      </Stack>
      {isLoading ? (
        <Skeleton width="100%" height={175} variant="rounded" />
      ) : (
        <CoreVaultLineChart {...chartData} />
      )}
      <Typography variant="h4" mt={5}>
        {name}
      </Typography>
      <Stack
        direction="row"
        mb={4}
        flexWrap="wrap"
        columnGap={1}
        rowGap={2}
        mt={2}
      >
        <Typography {...tagProps}>{config.symbol}</Typography>
      </Stack>
      <Stack
        direction="row"
        sx={(theme) => ({
          border: `1px solid ${theme.palette.divider}`,
          justifyContent: 'space-between',
          borderRadius: 1,
          padding: 1,
          mt: 'auto',
        })}
      >
        <ValueLabel
          label={apyLabel}
          hint={apyHint}
          components={{
            valueContainer: { pb: 0.3 },
            label: { sx: { mb: 0.5 } },
          }}
        >
          <Typography variant="value3">
            {isLoading ? <Skeleton width={50} /> : apy}
          </Typography>
        </ValueLabel>
        <ValueLabel
          label={balanceLabel}
          hint={balanceHint}
          components={{
            valueContainer: { pb: 0.3 },
            label: { sx: { mb: 0.5 } },
          }}
        >
          <Typography variant="value3">
            {isLoading ? <Skeleton width={50} /> : balance}
          </Typography>
        </ValueLabel>
        <ValueLabel
          label={tvlLabel}
          hint={tvlHint}
          components={{
            label: { sx: { mb: 0.5 } },
          }}
        >
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
