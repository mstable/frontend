import { ValueLabel } from '@frontend/shared-ui';
import { Divider, Skeleton, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useFlatcoin } from '../../state';

import type { StackProps } from '@mui/material';

export const Jumbo = (props: StackProps) => {
  const intl = useIntl();
  const { data, configs, type } = useFlatcoin();

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
            <Stack direction="row" spacing={1} alignItems="baseline">
              <Typography variant="value2">{data.tvl}</Typography>
            </Stack>
          )}
        </ValueLabel>
      </Stack>
    </Stack>
  );
};
