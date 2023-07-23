import { useUserTokenBalance } from '@dhedge/core-ui-kit/hooks/user';
import { useAccount } from '@dhedge/core-ui-kit/hooks/web3';
import { TradingInput } from '@frontend/shared-ui';
import { Divider, Stack } from '@mui/material';

import { useIsLeveragedType } from '../../../hooks/useIsLeveragedType';
import { useDepositQuote } from '../hooks/useDepositQuote';
import { useFlatcoinTradingState, useUpdateSendToken } from '../state';

import type { FC } from 'react';

const useTradingInputs = () => {
  const { account } = useAccount();
  const isLeveraged = useIsLeveragedType();
  const { sendToken, receiveToken, leverage } = useFlatcoinTradingState();
  const updateSendToken = useUpdateSendToken();
  const sendTokenBalance = useUserTokenBalance({
    symbol: sendToken.symbol,
    address: sendToken.address,
  });
  useDepositQuote();

  const onSendInputChange = (value) => updateSendToken({ value });

  return {
    sendToken,
    receiveToken,
    sendTokenBalance,
    account,
    onSendInputChange,
    receiveInputLabel: isLeveraged ? (
      <>Leverage: {leverage ? `${leverage}X` : ''}</>
    ) : (
      'Receive (estimated)'
    ),
  };
};

export const TradingInputs: FC = () => {
  const {
    sendToken,
    receiveToken,
    sendTokenBalance,
    account,
    onSendInputChange,
    receiveInputLabel,
  } = useTradingInputs();
  return (
    <Stack
      borderRadius={1}
      p={2}
      direction="column"
      spacing={3}
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: 'transparent',
      }}
    >
      <TradingInput
        token={sendToken}
        label="Pay with"
        onInputChange={onSendInputChange}
        maxBalance={sendTokenBalance}
        isConnected={!!account}
        autoFocus={!!account}
      />
      <Divider />
      <TradingInput
        token={receiveToken}
        label={receiveInputLabel}
        hideBottomRow
        disabled
        placeholder=""
      />
    </Stack>
  );
};
