import {
  HoverablePrimaryCard,
  TokenIconRevamp,
  ValueLabel,
} from '@frontend/shared-ui';
import { Skeleton, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { CoreVaultLineChart } from '../../CoreVaultLineChart';
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
    chartData,
    balance,
    balanceLabel,
    balanceHint,
    roiLabel,
    roiInfo,
  } = useCoreVaultCardProps(props);
  const { config, to, ...rest } = props;

  return (
    <HoverablePrimaryCard
      direction="column"
      p={3}
      primaryColor={config.primaryColor}
      {...rest}
      onClick={handleClick}
      sx={{ cursor: 'pointer', ...rest?.sx }}
      role="button"
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <TokenIconRevamp
          symbols={[config.symbol]}
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
      {isLoading ? (
        <Skeleton height={180} width={280} variant="rounded" />
      ) : (
        <CoreVaultLineChart {...chartData} height={180} width={280} />
      )}
      <Typography variant="h4" mb={2}>
        {name}
      </Typography>
      <Stack direction="row" mb={4} flexWrap="wrap" columnGap={1} rowGap={2}>
        <Typography {...tagProps}>{config.symbol}</Typography>
      </Stack>
      <Grid
        container
        spacing={1}
        sx={(theme) => ({
          border: `1px solid ${theme.palette.divider}`,
          justifyContent: 'space-between',
          borderRadius: 1,
          padding: 2,
          mt: 'auto',
          flexWrap: 'wrap',
        })}
      >
        <Grid xs={6}>
          <ValueLabel disableResponsive label={apyLabel} hint={apyHint}>
            <Typography variant="value3">
              {isLoading ? <Skeleton width={50} /> : apy}
            </Typography>
          </ValueLabel>
        </Grid>
        <Grid xs={6}>
          <ValueLabel disableResponsive label={balanceLabel} hint={balanceHint}>
            <Typography variant="value3">
              {isLoading ? <Skeleton width={50} /> : balance}
            </Typography>
          </ValueLabel>
        </Grid>
        <Grid xs={6}>
          <ValueLabel disableResponsive label={tvlLabel} hint={tvlHint}>
            <Stack direction="row" spacing={1} alignItems="baseline">
              <Typography variant="value3">
                {isLoading ? <Skeleton width={50} /> : tvl}
              </Typography>
            </Stack>
          </ValueLabel>
        </Grid>
        <Grid xs={6}>
          <ValueLabel
            label={roiLabel}
            disableResponsive
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
                  variant="value3"
                  color={
                    !roiInfo.roiInUsd
                      ? undefined
                      : roiInfo.roiInUsd > 0
                      ? 'success.main'
                      : 'error.main'
                  }
                >
                  {Intl.NumberFormat('en-US', {
                    currency: 'USD',
                    style: 'currency',
                    maximumSignificantDigits: 2,
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
              <Stack
                direction="row"
                alignItems="center"
                mt={-0.5}
                sx={{ flexWrap: 'nowrap' }}
              >
                <Typography
                  variant="value3"
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
        </Grid>
      </Grid>
    </HoverablePrimaryCard>
  );
};
