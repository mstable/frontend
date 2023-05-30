import {
  useReceiveTokenInput,
  useSendTokenInput,
  useTradingPanelPoolConfig,
} from '@dhedge/core-ui-kit/hooks/state';
import { useDepositQuote } from '@dhedge/core-ui-kit/hooks/trading/deposit';
import { useUserTokenBalance } from '@dhedge/core-ui-kit/hooks/user';
import { useAccount } from '@dhedge/core-ui-kit/hooks/web3';
import { TradingInput } from '@frontend/shared-ui';

import { ExchangeRate } from './ExchangeRate';

import type { FC } from 'react';

const useDepositInputsGroup = () => {
  const [sendToken, updater] = useSendTokenInput();
  const sendTokenBalance = useUserTokenBalance({
    symbol: sendToken.symbol,
    address: sendToken.address,
  });
  const [receiveToken] = useReceiveTokenInput();
  const poolConfig = useTradingPanelPoolConfig();
  useDepositQuote(poolConfig);

  const handleInputChange = (value: string) => {
    updater({ value });
  };

  return {
    sendToken,
    sendTokenBalance,
    receiveToken,
    onInputChange: handleInputChange,
  };
};

export const DepositInputsGroup: FC = () => {
  const { account } = useAccount();
  const { sendToken, sendTokenBalance, onInputChange, receiveToken } =
    useDepositInputsGroup();
  return (
    <>
      <TradingInput
        token={sendToken}
        label="Buy with"
        onChange={onInputChange}
        maxBalance={sendTokenBalance}
        isConnected={!!account}
        autoFocus={!!account}
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
