import { usePoolTokenPrice } from '@dhedge/core-ui-kit/hooks/pool';
import {
  useReceiveTokenInput,
  useSendTokenInput,
  useTradingPanelPoolConfig,
} from '@dhedge/core-ui-kit/hooks/state';
import { useAssetPrice } from '@dhedge/core-ui-kit/hooks/trading';
import { useWithdrawQuote } from '@dhedge/core-ui-kit/hooks/trading/withdraw';
import { useUserTokenBalance } from '@dhedge/core-ui-kit/hooks/user';
import { useAccount } from '@dhedge/core-ui-kit/hooks/web3';
import { TradingInput } from '@frontend/shared-ui';

import { ExchangeRate } from '../TradingRecap';

import type { FC } from 'react';

const useSendToken = () => {
  const { address, chainId } = useTradingPanelPoolConfig();
  const [data, updater] = useSendTokenInput();
  const balance = useUserTokenBalance({
    symbol: data.symbol,
    address: data.address,
  });
  const price = usePoolTokenPrice({ address, chainId });

  return {
    ...data,
    updater,
    balance,
    price,
  };
};

const useReceiveToken = () => {
  const { chainId } = useTradingPanelPoolConfig();
  const [data] = useReceiveTokenInput();
  const price = useAssetPrice({ address: data.address, chainId });

  return {
    ...data,
    price,
  };
};

const useWithdrawInputsGroup = () => {
  const poolConfig = useTradingPanelPoolConfig();
  useWithdrawQuote(poolConfig);
  const sendToken = useSendToken();
  const receiveToken = useReceiveToken();

  const handleInputChange = (value: string) => {
    sendToken.updater({ value });
  };

  return {
    sendToken,
    receiveToken,
    onInputChange: handleInputChange,
  };
};

export const WithdrawInputsGroup: FC = () => {
  const { account } = useAccount();
  const { sendToken, receiveToken, onInputChange } = useWithdrawInputsGroup();

  return (
    <>
      <TradingInput
        token={sendToken}
        label="Sell"
        onChange={onInputChange}
        maxBalance={sendToken.balance}
        isConnected={!!account}
        autoFocus={!!account}
      />
      <ExchangeRate />
      <TradingInput
        token={receiveToken}
        label="Receive (estimated)"
        hideBottomRow
        disabled
      />
    </>
  );
};
