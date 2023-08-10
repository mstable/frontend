import { formatToUsd } from '@dhedge/core-ui-kit/utils';
import { TokenIconRevamp } from '@frontend/shared-ui';
import {
  formatNumberToLimitedDecimals,
  isEqualAddresses,
} from '@frontend/shared-utils';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import { ArrowsClockwise } from 'phosphor-react';
import { useIntl } from 'react-intl';

import { useFlatcoinTradingState } from '../state';

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

const TOKEN_DECIMALS = 2;

const useStableTokensOverview = () => {
  const { sendToken, receiveToken, usdc, flatcoin } = useFlatcoinTradingState();
  const sendTokenPrice = isEqualAddresses(sendToken.address, usdc.address)
    ? usdc.price
    : flatcoin.price;
  const receiveTokenPrice = isEqualAddresses(receiveToken.address, usdc.address)
    ? usdc.price
    : flatcoin.price;

  return {
    sendToken,
    receiveToken,
    sendTokenUsdValue: new BigNumber(sendToken.value || 0)
      .multipliedBy(sendTokenPrice)
      .toFixed(),
    receiveTokenUsdValue: new BigNumber(receiveToken.value || 0)
      .multipliedBy(receiveTokenPrice)
      .toFixed(),
  };
};

export const StableTokensOverview: FC<StackProps> = (props) => {
  const intl = useIntl();
  const { sendToken, receiveToken, sendTokenUsdValue, receiveTokenUsdValue } =
    useStableTokensOverview();

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
          {intl.formatMessage({ defaultMessage: 'You Spend', id: '3xhnWF' })}
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
            `${formatNumberToLimitedDecimals(
              sendToken.value || 0,
              TOKEN_DECIMALS,
            )} ${sendToken.symbol}`
          )}
        </Typography>
        <Typography variant="value5" color="text.secondary">
          {receiveToken.isLoading ? (
            <Skeleton width={100} />
          ) : (
            `≈${formatNumberToLimitedDecimals(
              receiveToken.value || 0,
              TOKEN_DECIMALS,
            )} ${receiveToken.symbol}`
          )}
        </Typography>
      </Stack>
      <Stack {...rowProps}>
        <Typography variant="value5" color="text.secondary">
          {sendToken.isLoading ? (
            <Skeleton width={100} />
          ) : (
            formatToUsd({
              value: +sendTokenUsdValue,
              maximumFractionDigits: 2,
              minimumFractionDigits: 1,
            })
          )}
        </Typography>
        <Typography variant="value5" color="text.secondary">
          {receiveToken.isLoading ? (
            <Skeleton width={100} />
          ) : (
            `≈${formatToUsd({
              value: +receiveTokenUsdValue,
              maximumFractionDigits: 2,
              minimumFractionDigits: 1,
            })}`
          )}
        </Typography>
      </Stack>
    </Stack>
  );
};
