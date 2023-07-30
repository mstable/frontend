import { ValueLabel } from '@frontend/shared-ui';
import { Divider, Skeleton, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useFlatcoin } from '../../state';

import type { StackProps } from '@mui/material';

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
        {!data.fundingRate ? (
          <Skeleton height={24} width={60} />
        ) : (
          <Typography variant="value2">{data.fundingRate}</Typography>
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
        {!data.skew ? (
          <Skeleton height={24} width={60} />
        ) : (
          <Typography variant="value2">{data.skew}</Typography>
        )}
      </ValueLabel>
    </>
  );
};

export const Jumbo = (props: StackProps) => {
  const { configs, type } = useFlatcoin();

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
