import { useAccount } from '@dhedge/core-ui-kit/hooks/web3';
import { TradingInput } from '@frontend/shared-ui';
import { Divider } from '@mui/material';

import { useFlatcoin } from '../../../state';
import { useLeveragedTradeQuote } from '../hooks/useLeveragedTradeQuote';
import { useFlatcoinTradingState, useUpdateSendToken } from '../state';

const useLeveragedInputsGroup = () => {
  const { account } = useAccount();
  const {
    tokens: { collateral },
  } = useFlatcoin();
  const { sendToken, receiveToken, leverage } = useFlatcoinTradingState();
  const updateSendToken = useUpdateSendToken();
  useLeveragedTradeQuote();

  const onSendInputChange = (value) => updateSendToken({ value });

  return {
    sendToken,
    receiveToken,
    sendTokenBalance: collateral.balance.string,
    account,
    onSendInputChange,
    receiveInputLabel: <>Leverage: {leverage ? `${leverage}X` : ''}</>,
  };
};

export const LeveragedInputsGroup = () => {
  const {
    sendToken,
    receiveToken,
    sendTokenBalance,
    account,
    onSendInputChange,
    receiveInputLabel,
  } = useLeveragedInputsGroup();
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
