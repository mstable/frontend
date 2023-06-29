import { useAccount } from '@dhedge/core-ui-kit/hooks/web3';
import {
  useUserVaultBalance,
  useUserVaultInvestmentInfo,
} from '@frontend/shared-hooks';
import { CountUp } from '@frontend/shared-ui';
import { formatNumberToLimitedDecimals } from '@frontend/shared-utils';
import { Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useIntl } from 'react-intl';

import { useVault } from '../../state';

import type { CardProps } from '@mui/material';
import type { FC } from 'react';

export const Position: FC<CardProps> = (props) => {
  const { account } = useAccount();
  const { config } = useVault();
  const intl = useIntl();
  const {
    roiInPercentage,
    roiInUsd,
    customRoiInPercentage,
    customRoiInCurrency,
    customRoiCurrencySymbol,
  } = useUserVaultInvestmentInfo({
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
          <Grid2 container>
            {!!customRoiInCurrency && !!customRoiCurrencySymbol && (
              <Grid2 xs={6} direction="column">
                <Stack direcrion="column">
                  <CountUp
                    variant="value2"
                    mb={1}
                    color={
                      !!account && customRoiInCurrency !== 0
                        ? customRoiInCurrency > 0
                          ? 'success.main'
                          : 'error.main'
                        : 'text.secondary'
                    }
                    end={customRoiInCurrency}
                    prefix={customRoiCurrencySymbol}
                    decimals={4}
                  />
                  <CountUp
                    variant="value5"
                    color="text.secondary"
                    end={customRoiInPercentage}
                    suffix={intl.formatMessage({
                      defaultMessage: '%',
                      id: 'kZcqo0',
                    })}
                  />
                </Stack>
              </Grid2>
            )}
            <Grid2 xs={customRoiInPercentage ? 6 : 12} direction="column">
              <Stack direcrion="column">
                <CountUp
                  variant={customRoiInPercentage ? 'value2' : 'value1'}
                  mb={1}
                  color={
                    !!account && roiInUsd !== 0
                      ? roiInUsd > 0
                        ? 'success.main'
                        : 'error.main'
                      : 'text.secondary'
                  }
                  end={roiInUsd}
                  prefix={intl.formatMessage({
                    defaultMessage: '$',
                    id: 'hAz8Yo',
                  })}
                />
                <CountUp
                  variant="value5"
                  color="text.secondary"
                  end={roiInPercentage}
                  suffix={intl.formatMessage({
                    defaultMessage: '%',
                    id: 'kZcqo0',
                  })}
                />
              </Stack>
            </Grid2>
          </Grid2>
        </Stack>
      </CardContent>
    </Card>
  );
};
