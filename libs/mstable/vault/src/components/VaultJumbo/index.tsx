import { formatToUsd } from '@dhedge/core-ui-kit/utils';
import { DHEDGE } from '@frontend/shared-constants';
import { ValueLabel } from '@frontend/shared-ui';
import { Divider, Link, Skeleton, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useVault } from '../../state';
import { Apy } from '../Apy';

import type { StackProps } from '@mui/material';

export const VaultJumbo = (props: StackProps) => {
  const intl = useIntl();
  const { fund, config } = useVault();

  const analyticsHref = `${DHEDGE}vault/${config.address}`;

  return (
    <Stack direction="column" alignItems="flex-start" {...props}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        width="100%"
        justifyContent="space-between"
        spacing={{ xs: 2, md: 4 }}
        pb={2}
      >
        <Typography variant="h1">{fund?.name}</Typography>
        <Link
          href={analyticsHref}
          underline="none"
          target="_blank"
          rel="noopener"
        >
          <Typography>
            {intl.formatMessage({
              defaultMessage: 'Analytics on <strong>dHEDGE</strong>',
              id: 'pwg4Vp',
            })}
          </Typography>
        </Link>
      </Stack>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        columnGap={4}
        rowGap={1}
        width={1}
        divider={<Divider orientation="vertical" flexItem variant="middle" />}
      >
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'APY', id: 'MLTKb6' })}
          hint={intl.formatMessage({
            defaultMessage: 'Annual percentage yield.',
            id: 'IB0eky',
          })}
        >
          {!fund?.apy ? (
            <Skeleton height={24} width={60} />
          ) : (
            <Apy variant="value1" fundApy={fund?.apy} />
          )}
        </ValueLabel>
        <ValueLabel
          label={intl.formatMessage({
            defaultMessage: 'Token Price',
            id: 'ehxGBh',
          })}
          hint={intl.formatMessage({
            defaultMessage:
              'The current price of 1 token. Return is represented as an increase in token price value.',
            id: 'Am173P',
          })}
        >
          {!fund?.tokenPrice ? (
            <Skeleton height={24} width={60} />
          ) : (
            <Typography variant="value3">
              {formatToUsd({
                value: +fund.tokenPrice,
                maximumFractionDigits: 4,
                normalize: true,
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
          {!fund?.totalValue ? (
            <Skeleton height={24} width={60} />
          ) : (
            <Stack direction="row" spacing={1} alignItems="baseline">
              <Typography variant="value3">
                {formatToUsd({
                  value: +fund?.totalValue,
                  normalize: true,
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                })}
              </Typography>
            </Stack>
          )}
        </ValueLabel>
      </Stack>
    </Stack>
  );
};
