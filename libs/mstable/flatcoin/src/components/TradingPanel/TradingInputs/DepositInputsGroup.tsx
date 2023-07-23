import { useUserTokenBalance } from '@dhedge/core-ui-kit/hooks/user';
import { useAccount } from '@dhedge/core-ui-kit/hooks/web3';
import { TradingInput } from '@frontend/shared-ui';
import { Divider } from '@mui/material';

import { useFlatcoinPageState } from '../../../state';
import { useDepositQuote } from '../hooks/useDepositQuote';
import { useFlatcoinTradingState, useUpdateSendToken } from '../state';

import type { FC } from 'react';

const useDepositInputsGroup = () => {
  const { account } = useAccount();
  const isLeveraged = useFlatcoinPageState().type === 'leveraged';
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

export const DepositInputsGroup: FC = () => {
  const {
    sendToken,
    receiveToken,
    sendTokenBalance,
    account,
    onSendInputChange,
    receiveInputLabel,
  } = useDepositInputsGroup();
  return (
    <>
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
    </>
  );
};
