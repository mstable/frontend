import {
  useIsDepositTradingPanelType,
  useReceiveTokenInput,
  useSendTokenInput,
} from '@dhedge/core-ui-kit/hooks/state';
import { TokenIconRevamp } from '@frontend/shared-ui';
import { formatNumberToLimitedDecimals } from '@frontend/shared-utils';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import { ArrowsClockwise } from 'phosphor-react';
import { useIntl } from 'react-intl';

import type { BoxProps, StackProps } from '@mui/material';
import type { FC } from 'react';

const rowProps: StackProps = {
  width: 1,
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const logoContainerProps: StackProps = {
  ...rowProps,
  position: 'relative',
  sx: (theme) => ({
    '::after': {
      content: '""',
      height: '2px',
      top: '50%',
      left: 38,
      right: 38,
      background: theme.palette.background.highlight,
      position: 'absolute',
      zIndex: 1,
    },
  }),
};

const logoBoxProps: BoxProps = {
  borderRadius: '50%',
  width: 30,
  height: 30,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2,
};

export const TradingTokensOverview: FC<StackProps> = (props) => {
  const intl = useIntl();
  const [sendToken] = useSendTokenInput();
  const [receiveToken] = useReceiveTokenInput();
  const isDeposit = useIsDepositTradingPanelType();

  return (
    <Stack {...props} direction="column" spacing={1}>
      <Stack {...logoContainerProps}>
        <Box {...logoBoxProps} bgcolor="icons.background">
          <TokenIconRevamp symbols={[sendToken.symbol]} />
        </Box>
        <Box {...logoBoxProps} bgcolor="background.paper">
          <ArrowsClockwise />
        </Box>
        <Box {...logoBoxProps} bgcolor="icons.background">
          <TokenIconRevamp symbols={[receiveToken.symbol]} />
        </Box>
      </Stack>
      <Stack {...rowProps}>
        <Typography variant="label2">
          {intl.formatMessage(
            { defaultMessage: 'You {operation}', id: 'IBFkFM' },
            { operation: isDeposit ? 'Deposit' : 'Sell' },
          )}
        </Typography>
        <Typography variant="label2">
          {intl.formatMessage({ defaultMessage: 'You Receive', id: 'Gh1Vm9' })}
        </Typography>
      </Stack>
      <Stack {...rowProps}>
        <Typography variant="value5" color="text.secondary">
          {sendToken.isLoading ? (
            <Skeleton width={100} />
          ) : (
            `${formatNumberToLimitedDecimals(sendToken.value || 0)} ${
              sendToken.symbol
            }`
          )}
        </Typography>
        <Typography variant="value5" color="text.secondary">
          {receiveToken.isLoading ? (
            <Skeleton width={100} />
          ) : (
            `≈${formatNumberToLimitedDecimals(receiveToken.value || 0)} ${
              receiveToken.symbol
            }`
          )}
        </Typography>
      </Stack>
    </Stack>
  );
};
