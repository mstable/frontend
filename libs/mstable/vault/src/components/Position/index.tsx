import { useAccount } from '@dhedge/core-ui-kit/hooks/web3';
import {
  useUserVaultBalance,
  useUserVaultInvestmentInfo,
} from '@frontend/shared-hooks';
import { CountUp } from '@frontend/shared-ui';
import { formatNumberToLimitedDecimals } from '@frontend/shared-utils';
import { Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useVault } from '../../state';

import type { CardProps } from '@mui/material';
import type { FC } from 'react';

export const Position: FC<CardProps> = (props) => {
  const { account } = useAccount();
  const { config } = useVault();
  const intl = useIntl();
  const { formattedRoi, formattedRoiUsd } = useUserVaultInvestmentInfo({
    address: config.address,
  });
  const { balanceInUsd, balance } = useUserVaultBalance({
    address: config.address,
    watch: true,
  });

  return (
    <Card {...props}>
      <CardContent>
        <Stack direction="column">
          <Typography variant="body2" color="text.secondary" mb={2}>
            {intl.formatMessage({
              defaultMessage: 'Position Value',
              id: 'TL3yAY',
            })}
          </Typography>
          <Typography variant="value1" color="text.secondary" mb={1}>
            {balanceInUsd}
          </Typography>
          <Typography variant="value5" color="text.secondary">
            {formatNumberToLimitedDecimals(+balance, 4)} {config.symbol}
          </Typography>
          <Divider flexItem sx={{ my: 3 }} />
          <Typography variant="body2" color="text.secondary" mb={2}>
            {intl.formatMessage({
              defaultMessage: 'Profit/Loss',
              id: 'rfzzi6',
            })}
          </Typography>
          <CountUp
            variant="value1"
            mb={1}
            color={
              !!account && formattedRoiUsd !== '0'
                ? +formattedRoiUsd > 0
                  ? 'success.main'
                  : 'error.main'
                : 'text.secondary'
            }
            end={+formattedRoiUsd}
            prefix={intl.formatMessage({
              defaultMessage: '$',
              id: 'hAz8Yo',
            })}
          />
          <CountUp
            variant="value5"
            color="text.secondary"
            end={+formattedRoi}
            suffix={intl.formatMessage({
              defaultMessage: '%',
              id: 'kZcqo0',
            })}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};
