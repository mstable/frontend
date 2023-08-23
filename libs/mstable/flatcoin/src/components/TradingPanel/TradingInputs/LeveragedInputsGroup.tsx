import { useAccount } from '@dhedge/core-ui-kit/hooks/web3';
import { TradingInput } from '@frontend/shared-ui';
import { Divider } from '@mui/material';

import { useFlatcoin } from '../../../state';
import { useLeveragedTradeQuote } from '../hooks/useLeveragedTradeQuote';
import { useFlatcoinTradingState, useUpdateSendToken } from '../state';
import { LeverageSettings } from './LeverageSettings';

const useLeveragedInputsGroup = () => {
  const { account } = useAccount();
  const {
    tokens: { collateral },
  } = useFlatcoin();
  const { sendToken } = useFlatcoinTradingState();
  const updateSendToken = useUpdateSendToken();
  useLeveragedTradeQuote();

  const onSendInputChange = (value) => updateSendToken({ value });

  return {
    sendToken,
    sendTokenBalance: collateral.balance.string,
    account,
    onSendInputChange,
  };
};

export const LeveragedInputsGroup = () => {
  const { sendToken, sendTokenBalance, account, onSendInputChange } =
    useLeveragedInputsGroup();
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
      <LeverageSettings label="Leverage" />
    </>
  );
};
