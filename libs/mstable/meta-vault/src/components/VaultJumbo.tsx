import { useMemo } from 'react';

import { useDataSource } from '@frontend/shared-data-access';
import { ProtocolIcon, TokenIcon, ValueLabel } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import { constants } from 'ethers';
import { useIntl } from 'react-intl';

import { useMetavaultQuery } from '../queries.generated';
import { useMetavault } from '../state';

import type { BoxProps, TypographyProps } from '@mui/material';

const tagProps: TypographyProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'medium',
  fontSize: 14,
  px: 1,
  height: 30,
  bgcolor: (theme) =>
    theme.palette.mode === 'light'
      ? theme.palette.grey[50]
      : theme.palette.grey[900],
  border: (theme) => `1px solid ${theme.palette.divider}`,
  borderRadius: 2,
};

const protocolProps: BoxProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  p: 1,
  height: 24,
  width: 24,
  bgcolor: (theme) =>
    theme.palette.mode === 'light'
      ? theme.palette.grey[50]
      : theme.palette.grey[900],
  borderRadius: '50%',
};

export const VaultJumbo = () => {
  const intl = useIntl();
  const {
    metavault: { address, name, tags, strategies },
    assetToken,
  } = useMetavault();
  const dataSource = useDataSource();
  const { data, isLoading } = useMetavaultQuery(dataSource, { id: address });
  const apyTrend = useMemo(() => {
    const last = new BigDecimal(
      data?.vault?.DailyVaultStats?.[-1]?.totalSupply ?? constants.Zero,
    );
    const first = new BigDecimal(
      data?.vault?.DailyVaultStats?.[0]?.totalSupply ?? constants.Zero,
    );

    return last.sub(first);
  }, [data?.vault?.DailyVaultStats]);

  console.log(apyTrend.simple);

  return (
    <Stack
      direction="column"
      alignItems="flex-start"
      width={1}
      height={1}
      px={1}
      pb={2}
    >
      <Typography variant="h1" pt={14} pb={2}>
        {name}
      </Typography>
      <Stack direction="row" spacing={1.5}>
        {tags?.length &&
          tags.map((tag, idx) => (
            <Typography key={`tag-${idx}`} {...tagProps}>
              {intl.formatMessage(tag)}
            </Typography>
          ))}
      </Stack>
      <Stack
        direction="row"
        mt={{ xs: 4, md: 6 }}
        spacing={{ xs: 3, md: 4 }}
        sx={{ overflowX: 'auto', maxWidth: 1 }}
      >
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'Asset' })}
          components={{ valueContainer: { pb: 0.3 } }}
        >
          <TokenIcon
            symbol={assetToken?.symbol}
            sx={{ height: 24, width: 24 }}
          />
        </ValueLabel>
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'Protocols Involved' })}
          components={{ valueContainer: { pb: 0.3 } }}
        >
          <Stack direction="row" alignItems="center" spacing={-0.5}>
            {strategies.map((strat, idx) => (
              <Box key={strat.protocol.id} {...protocolProps} zIndex={idx}>
                <ProtocolIcon
                  name={strat.protocol.id}
                  sx={{ height: 20, width: 20 }}
                />
              </Box>
            ))}
          </Stack>
        </ValueLabel>
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'TVL' })}
          hint={intl.formatMessage({ defaultMessage: 'Total Supply' })}
        >
          {isLoading ? (
            <Skeleton height={24} width={60} />
          ) : (
            <Typography variant="value2">
              {intl.formatNumber(
                new BigDecimal(data?.vault?.totalSupply ?? constants.Zero)
                  .simple,
                { notation: 'compact' },
              )}
            </Typography>
          )}
        </ValueLabel>
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'APY' })}
          hint={intl.formatMessage({
            defaultMessage: 'Annual Percentage Yield',
          })}
        >
          {isLoading ? (
            <Skeleton height={24} width={60} />
          ) : (
            <Typography variant="value2">
              {intl.formatNumber(
                new BigDecimal(data?.vault?.apy ?? constants.Zero).simple,
                { style: 'percent' },
              )}
            </Typography>
          )}
        </ValueLabel>
      </Stack>
    </Stack>
  );
};
