import { formatToUsd } from '@dhedge/core-ui-kit/utils';
import { formatNumberToLimitedDecimals } from '@frontend/shared-utils';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useFlatcoin } from '../../../state';

import type { CardProps } from '@mui/material';
import type { FC } from 'react';

export const StablePosition: FC<CardProps> = (props) => {
  const intl = useIntl();
  const {
    tokens: {
      flatcoin: { balance, price, symbol },
    },
  } = useFlatcoin();

  return (
    <Card {...props}>
      <CardContent>
        <Stack direction="column">
          <Typography variant="body2" color="text.secondary" mb={2}>
            {intl.formatMessage({
              defaultMessage: 'Stable Position Value',
              id: '0fFawv',
            })}
          </Typography>
          <Typography variant="value1" color="text.secondary" mb={1}>
            {formatToUsd({ value: +balance * +price })}
          </Typography>
          <Typography variant="value5" color="text.secondary">
            {formatNumberToLimitedDecimals(+balance, 4)} {symbol}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
