import {
  useReceiveTokenInput,
  useSendTokenInput,
  useTradingPanelPoolConfig,
} from '@dhedge/core-ui-kit/hooks/state';
import {
  useDepositQuote,
  usePoolDepositTokens,
} from '@dhedge/core-ui-kit/hooks/trading/deposit';
import { useUserTokenBalance } from '@dhedge/core-ui-kit/hooks/user';
import { useAccount } from '@dhedge/core-ui-kit/hooks/web3';

import { ExchangeRate } from './ExchangeRate';
import { TradingInput } from './TradingInput';

import type { FC } from 'react';

const useDepositInputsGroup = () => {
  const [sendToken, updateSendToken] = useSendTokenInput();
  const sendTokenBalance = useUserTokenBalance({
    symbol: sendToken.symbol,
    address: sendToken.address,
    watch: true,
  });
  const [receiveToken] = useReceiveTokenInput();
  const depositTokens = usePoolDepositTokens();
  const poolConfig = useTradingPanelPoolConfig();
  useDepositQuote(poolConfig);

  const handleInputChange = (value: string) => {
    updateSendToken({ value });
  };

  return {
    sendToken,
    sendTokenBalance,
    receiveToken,
    depositTokens,
    onInputChange: handleInputChange,
    updateSendToken,
  };
};

export const DepositInputsGroup: FC = () => {
  const { account } = useAccount();
  const {
    sendToken,
    sendTokenBalance,
    onInputChange,
    receiveToken,
    depositTokens,
    updateSendToken,
  } = useDepositInputsGroup();

  return (
    <>
      <TradingInput
        token={sendToken}
        label="Buy with"
        onInputChange={onInputChange}
        onTokenChange={updateSendToken}
        maxBalance={sendTokenBalance}
        isConnected={!!account}
        autoFocus={!!account}
        tokenOptions={depositTokens}
      />
      <ExchangeRate />
      <TradingInput
        token={receiveToken}
        label="Buy (estimated)"
        hideBottomRow
        disabled
        placeholder=""
      />
    </>
  );
};
