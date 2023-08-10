import { formatToUsd } from '@dhedge/core-ui-kit/utils';
import { ValueLabel } from '@frontend/shared-ui';
import { Divider, Skeleton, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useVault } from '../../state';
import { Apy } from '../Apy';

import type { StackProps } from '@mui/material';

export const VaultJumbo = (props: StackProps) => {
  const intl = useIntl();
  const { fund } = useVault();

  return (
    <Stack
      direction="column"
      alignItems="flex-start"
      width={1}
      height={1}
      {...props}
    >
      <Typography variant="h1" pb={2}>
        {fund?.name}
      </Typography>
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
