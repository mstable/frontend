import { ValueLabel } from '@frontend/shared-ui';
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
  const { data } = useFlatcoin();

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
        {isNaN(data.fundingRate) ? (
          <Skeleton height={24} width={60} />
        ) : (
          <Typography variant="value2" color={resolveColor(data.fundingRate)}>
            {data.fundingRate}
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
          <Typography variant="value2">{data.openInterest}</Typography>
        )}
      </ValueLabel>
      <ValueLabel
        label={intl.formatMessage({ defaultMessage: 'Skew', id: 'MQ02gW' })}
        hint={intl.formatMessage({ defaultMessage: 'Skew', id: 'MQ02gW' })}
      >
        {isNaN(data.skew) ? (
          <Skeleton height={24} width={60} />
        ) : (
          <Typography variant="value2" color={resolveColor(data.skew)}>
            {data.skew}% {resolveSkewPosition(data.skew)}
          </Typography>
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
