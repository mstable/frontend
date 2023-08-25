import { DEFAULT_TOKEN_DECIMALS } from '@frontend/shared-constants';
import { ValueLabel } from '@frontend/shared-ui';
import { formatNumberToLimitedDecimals } from '@frontend/shared-utils';
import { Divider, Skeleton, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useFlatcoinType } from '../../hooks';
import { useFlatcoin } from '../../state';

import type { StackProps } from '@mui/material';

const resolveSkewPosition = (value: number) => {
  if (value > 0) {
    return 'long';
  }
  if (value < 0) {
    return 'short';
  }

  return '';
};

const resolveColor = (value: number) => {
  if (value > 0) {
    return 'success.main';
  }
  if (value < 0) {
    return 'error.main';
  }

  return undefined;
};

const FlatcoinValues = () => {
  const intl = useIntl();
  const { data } = useFlatcoin();

  return (
    <>
      <ValueLabel
        label={intl.formatMessage({ defaultMessage: 'APY', id: 'MLTKb6' })}
        hint={intl.formatMessage({
          defaultMessage: 'Annual percentage yield.',
          id: 'IB0eky',
        })}
      >
        {!data.apy ? (
          <Skeleton height={24} width={60} />
        ) : (
          <Typography variant="value2">{data.apy}</Typography>
        )}
      </ValueLabel>
      <ValueLabel
        label={intl.formatMessage({ defaultMessage: 'TVL', id: 'SKB/G9' })}
        hint={intl.formatMessage({
          defaultMessage: 'Total Value Locked',
          id: 'DUR59o',
        })}
      >
        {!data.tvl ? (
          <Skeleton height={24} width={60} />
        ) : (
          <Typography variant="value2">{data.tvl}</Typography>
        )}
      </ValueLabel>
    </>
  );
};
const LeveragedEthValues = () => {
  const intl = useIntl();
  const {
    data,
    tokens: { collateral },
  } = useFlatcoin();
  return (
    <>
      <ValueLabel
        label={intl.formatMessage({
          defaultMessage: 'Funding Rate',
          id: 'CB1174',
        })}
        hint={intl.formatMessage({
          defaultMessage: 'Funding Rate',
          id: 'CB1174',
        })}
      >
        {!data.fundingRate ? (
          <Skeleton height={24} width={60} />
        ) : (
          <Typography
            variant="value2"
            color={resolveColor(data.fundingRate.simple)}
          >
            {formatNumberToLimitedDecimals(data.fundingRate.simple, 6)}%
          </Typography>
        )}
      </ValueLabel>
      <ValueLabel
        label={intl.formatMessage({
          defaultMessage: 'Open Interest',
          id: 'PQiNnk',
        })}
        hint={intl.formatMessage({
          defaultMessage: 'Open Interest',
          id: 'PQiNnk',
        })}
      >
        {!data.openInterest ? (
          <Skeleton height={24} width={60} />
        ) : (
          <Typography variant="value3">
            {formatNumberToLimitedDecimals(
              data.openInterest.simple,
              DEFAULT_TOKEN_DECIMALS,
            )}{' '}
            {collateral.symbol}
          </Typography>
        )}
      </ValueLabel>
      <ValueLabel
        label={intl.formatMessage({ defaultMessage: 'Skew', id: 'MQ02gW' })}
        hint={intl.formatMessage({ defaultMessage: 'Skew', id: 'MQ02gW' })}
        components={{
          valueContainer: {
            spacing: 1,
          },
        }}
      >
        {!data.skew ? (
          <Skeleton height={24} width={60} />
        ) : (
          <>
            <Typography variant="value3" color={resolveColor(data.skew.simple)}>
              {resolveSkewPosition(data.skew.simple)}{' '}
              {formatNumberToLimitedDecimals(
                data.skew.simple,
                DEFAULT_TOKEN_DECIMALS,
              )}
            </Typography>
            <Typography variant="value3">{collateral.symbol}</Typography>
          </>
        )}
      </ValueLabel>
    </>
  );
};

export const Jumbo = (props: StackProps) => {
  const [type] = useFlatcoinType();
  const { configs } = useFlatcoin();

  return (
    <Stack
      direction="column"
      alignItems="flex-start"
      width={1}
      height={1}
      {...props}
    >
      <Typography variant="h1" pb={2}>
        {configs?.[type].name}
      </Typography>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        columnGap={4}
        rowGap={1}
        width={1}
        divider={<Divider orientation="vertical" flexItem variant="middle" />}
      >
        {type === 'flatcoin' ? <FlatcoinValues /> : <LeveragedEthValues />}
      </Stack>
    </Stack>
  );
};
