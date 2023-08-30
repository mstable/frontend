import {
  useReceiveTokenInput,
  useSendTokenInput,
  useTradingPanelPoolConfig,
} from '@dhedge/core-ui-kit/hooks/state';
import { useWithdrawQuote } from '@dhedge/core-ui-kit/hooks/trading/withdraw';
import { useUserTokenBalance } from '@dhedge/core-ui-kit/hooks/user';
import { useAccount } from '@dhedge/core-ui-kit/hooks/web3';

import { ExchangeRate } from './ExchangeRate';
import { TradingInput } from './TradingInput';

import type { FC } from 'react';

const useWithdrawInputsGroup = () => {
  const [sendToken, updateSendToken] = useSendTokenInput();
  const [, updateReceiveToken] = useReceiveTokenInput();
  const sendTokenBalance = useUserTokenBalance({
    symbol: sendToken.symbol,
    address: sendToken.address,
    watch: true,
  });
  const [receiveToken] = useReceiveTokenInput();
  const poolConfig = useTradingPanelPoolConfig();
  useWithdrawQuote(poolConfig);

  const handleInputChange = (value: string) => {
    updateSendToken({ value });
  };

  return {
    sendToken,
    sendTokenBalance,
    receiveToken,
    onInputChange: handleInputChange,
    withdrawTokens: poolConfig.withdrawParams.customTokens,
    updateReceiveToken,
  };
};

export const WithdrawInputsGroup: FC = () => {
  const { account } = useAccount();
  const {
    sendToken,
    sendTokenBalance,
    receiveToken,
    onInputChange,
    withdrawTokens,
    updateReceiveToken,
  } = useWithdrawInputsGroup();

  return (
    <>
      <TradingInput
        token={sendToken}
        label="Sell"
        onInputChange={onInputChange}
        maxBalance={sendTokenBalance}
        isConnected={!!account}
        autoFocus={!!account}
      />
      <ExchangeRate />
      <TradingInput
        token={receiveToken}
        tokenOptions={withdrawTokens}
        onTokenChange={updateReceiveToken}
        label="Receive (estimated)"
        hideBottomRow
        disabled
        placeholder=""
      />
    </>
  );
};
