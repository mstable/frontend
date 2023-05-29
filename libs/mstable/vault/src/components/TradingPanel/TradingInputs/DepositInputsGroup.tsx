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

const useSendToken = () => {
  const [data, updater] = useSendTokenInput();
  const balance = useUserTokenBalance({
    symbol: data.symbol,
    address: data.address,
  });

  return {
    ...data,
    balance,
    updater,
  };
};

const useDepositInputsGroup = () => {
  const sendToken = useSendToken();
  const [receiveToken] = useReceiveTokenInput();
  const poolConfig = useTradingPanelPoolConfig();
  useDepositQuote(poolConfig);

  const handleInputChange = (value: string) => {
    sendToken.updater({ value });
  };

  return {
    sendToken,
    receiveToken,
    onInputChange: handleInputChange,
  };
};

export const DepositInputsGroup: FC = () => {
  const { account } = useAccount();
  const { sendToken, onInputChange, receiveToken } = useDepositInputsGroup();
  return (
    <>
      <TradingInput
        token={sendToken}
        label="Buy with"
        onChange={onInputChange}
        maxBalance={sendToken.balance}
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
