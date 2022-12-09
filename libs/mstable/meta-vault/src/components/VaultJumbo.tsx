import { useMemo } from 'react';

import { useDataSource } from '@frontend/mstable-shared-data-access';
import { useGetPrices, usePrices } from '@frontend/shared-prices';
import { ProtocolIcon, ValueLabel } from '@frontend/shared-ui';
import { BigDecimal, isNilOrEmpty } from '@frontend/shared-utils';
import {
  Avatar,
  AvatarGroup,
  Divider,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { constants } from 'ethers';
import { pathOr } from 'ramda';
import { useIntl } from 'react-intl';

import { useMetavaultQuery } from '../queries.generated';
import { useMetavault } from '../state';

import type { StackProps, TypographyProps } from '@mui/material';

const tagProps: TypographyProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'medium',
  px: 1,
  noWrap: true,
  bgcolor: (theme) =>
    theme.palette.mode === 'light'
      ? theme.palette.grey[50]
      : theme.palette.grey[900],
  border: (theme) => `1px solid ${theme.palette.divider}`,
  borderRadius: 2,
  sx: (theme) => ({
    height: 30,
    fontSize: 14,
    [theme.breakpoints.down('md')]: {
      height: 20,
      fontSize: 12,
    },
  }),
};

export const VaultJumbo = (props: StackProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const {
    metavault: { address, name, tags, strategies, firstBlock },
    assetToken,
    roi,
  } = useMetavault();
  const dataSource = useDataSource();
  const { data, isLoading } = useMetavaultQuery(
    dataSource,
    { id: address, firstBlock },
    { enabled: !!address },
  );
  const { currency } = usePrices();
  const { data: prices, isLoading: isPriceLoading } = useGetPrices([
    assetToken?.address,
  ]);
  const tvlTrend = useMemo(() => {
    if (isNilOrEmpty(data?.vault?.DailyVaultStats)) {
      return { label: '-', color: theme.palette.text.primary };
    }

    const oneWeekAgo = new BigDecimal(
      data?.vault?.DailyVaultStats?.[6]?.totalAssets ?? constants.One,
    );

    const current = new BigDecimal(
      data?.vault?.DailyVaultStats?.[0]?.totalAssets ?? constants.One,
    );

    const diff = 100 - (oneWeekAgo.simple / current.simple) * 100;

    return {
      label: `${diff >= 0 ? '+' : ''}${diff.toFixed(2)}%(1W)`,
      color:
        diff > 0
          ? theme.palette.success.dark
          : diff < 0
          ? theme.palette.error.main
          : theme.palette.text.primary,
    };
  }, [
    data,
    theme.palette.error.main,
    theme.palette.success.dark,
    theme.palette.text.primary,
  ]);

  return (
    <Stack
      direction="column"
      alignItems="flex-start"
      width={1}
      height={1}
      {...props}
    >
      <Typography variant="h1" pb={2}>
        {name}
      </Typography>
      <Stack
        direction="row"
        columnGap={1.5}
        rowGap={1}
        flexWrap="wrap"
        sx={{ pb: 7.5 }}
      >
        {tags.map((tag, idx) => (
          <Typography key={`tag-${idx}`} {...tagProps}>
            {intl.formatMessage(tag)}
          </Typography>
        ))}
      </Stack>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        columnGap={4}
        rowGap={1}
        width={1}
        divider={<Divider orientation="vertical" flexItem variant="middle" />}
      >
        <ValueLabel
          label={intl.formatMessage({
            defaultMessage: 'Share Price',
            id: 'TvzL+L',
          })}
          hint={intl.formatMessage({
            defaultMessage:
              'The current price of 1 share. Return is represented as a increase in share price value.',
            id: 'ULHfQE',
          })}
        >
          {isLoading ? (
            <Skeleton height={24} width={60} />
          ) : (
            <Typography variant="value2">
              {intl.formatNumber(data?.vault?.assetPerShare ?? 0, {
                style: 'currency',
                currency,
              })}
            </Typography>
          )}
        </ValueLabel>
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'ROI', id: 'P8Xs51' })}
          hint={intl.formatMessage({
            defaultMessage: 'Return on investment since Vault inception.',
            id: 'zKtTJT',
          })}
        >
          {isLoading ? (
            <Skeleton height={24} width={60} />
          ) : (
            <Typography variant="value2">
              {intl.formatNumber(roi, {
                style: 'percent',
                minimumFractionDigits: 2,
              })}
            </Typography>
          )}
        </ValueLabel>
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'TVL', id: 'SKB/G9' })}
          hint={intl.formatMessage({
            defaultMessage: 'Total Value Locked',
            id: 'DUR59o',
          })}
        >
          {isLoading || isPriceLoading || !assetToken ? (
            <Skeleton height={24} width={160} />
          ) : (
            <Stack direction="row" spacing={1} alignItems="baseline">
              <Typography variant="value2">
                {intl.formatNumber(
                  new BigDecimal(
                    data?.vault?.totalAssets ?? constants.Zero,
                    assetToken?.decimals,
                  ).simple *
                    Number(pathOr(1, [currency.toLowerCase()], prices)),
                  { style: 'currency', currency, notation: 'compact' },
                )}
              </Typography>
              <Typography variant="value5" sx={{ color: tvlTrend.color }}>
                {tvlTrend.label}
              </Typography>
            </Stack>
          )}
        </ValueLabel>
        <ValueLabel
          label={intl.formatMessage({
            defaultMessage: 'Protocols Involved',
            id: '65ThHj',
          })}
          components={{
            valueContainer: { pb: 0.3 },
          }}
        >
          <AvatarGroup max={6}>
            {strategies.map((strat) => (
              <Avatar key={strat.protocol.id}>
                <ProtocolIcon
                  name={strat.protocol.id}
                  sx={{ height: 20, width: 20 }}
                />
              </Avatar>
            ))}
          </AvatarGroup>
        </ValueLabel>
      </Stack>
    </Stack>
  );
};
