import {
  HoverablePrimaryCard,
  TokenIconRevamp,
  ValueLabel,
} from '@frontend/shared-ui';
import { Skeleton, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

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
    roiInfo,
    roiLabel,
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
      <Grid2
        container
        spacing={0.5}
        sx={(theme) => ({
          border: `1px solid ${theme.palette.divider}`,
          justifyContent: 'space-between',
          borderRadius: 1,
          padding: 1,
          mt: 'auto',
          paddingX: 3,
        })}
      >
        <Grid2 xs={6}>
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
        </Grid2>
        <Grid2 xs={6}>
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
        </Grid2>
        <Grid2 xs={6}>
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
        </Grid2>
        <Grid2 xs={6}>
          <ValueLabel
            label={roiLabel}
            components={{
              valueContainer: { pb: 0.3 },
              label: { sx: { mb: 0.5 } },
            }}
          >
            {roiInfo.isRoiLoading ? (
              <Skeleton width={50} />
            ) : (
              <>
                <Typography
                  variant={roiInfo.customRoiInCurrency ? 'value4' : 'value3'}
                  color={
                    roiInfo.roiInUsd === 0
                      ? undefined
                      : roiInfo.roiInUsd > 0
                      ? 'success.main'
                      : 'error.main'
                  }
                >
                  {Intl.NumberFormat('en-US', {
                    currency: 'USD',
                    style: 'currency',
                    maximumSignificantDigits: 3,
                  }).format(roiInfo.roiInUsd)}
                </Typography>
                {roiInfo.roiInUsd !== 0 && (
                  <Typography
                    variant="value5"
                    color={
                      roiInfo.roiInPercentage === 0
                        ? undefined
                        : roiInfo.roiInPercentage > 0
                        ? 'success.main'
                        : 'error.main'
                    }
                    ml={0.5}
                  >
                    (
                    {Intl.NumberFormat('en-US', {
                      style: 'percent',
                      maximumSignificantDigits: 2,
                    }).format(roiInfo.roiInPercentage / 100)}
                    )
                  </Typography>
                )}
              </>
            )}
          </ValueLabel>
          {!!roiInfo.customRoiInCurrency &&
            !!roiInfo.customRoiCurrencySymbol && (
              <Stack direction="row" alignItems="center" mt={-0.5}>
                <Typography
                  variant="value4"
                  color={
                    roiInfo.customRoiInCurrency === 0
                      ? undefined
                      : roiInfo.customRoiInCurrency > 0
                      ? 'success.main'
                      : 'error.main'
                  }
                >
                  {Intl.NumberFormat('en-US', {
                    currency: 'USD',
                    style: 'currency',
                    maximumFractionDigits: 3,
                  })
                    .format(roiInfo.customRoiInCurrency)
                    .replace('$', roiInfo.customRoiCurrencySymbol)}
                </Typography>
                <Typography
                  variant="value5"
                  color={
                    roiInfo.customRoiInPercentage === 0
                      ? undefined
                      : roiInfo.customRoiInPercentage > 0
                      ? 'success.main'
                      : 'error.main'
                  }
                >
                  (
                  {Intl.NumberFormat('en-US', {
                    style: 'percent',
                    maximumSignificantDigits: 2,
                  }).format(roiInfo.customRoiInPercentage / 100)}
                  )
                </Typography>
              </Stack>
            )}
        </Grid2>
      </Grid2>
    </HoverablePrimaryCard>
  );
};
