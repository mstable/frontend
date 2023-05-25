import {
  useReceiveTokenInput,
  useSendTokenInput,
  useTradingPanelPoolConfig,
} from '@dhedge/core-ui-kit/hooks/state';
import { useExchangeRate } from '@dhedge/core-ui-kit/hooks/trading';
import { useDepositQuote } from '@dhedge/core-ui-kit/hooks/trading/deposit';
import { useUserTokenBalance } from '@dhedge/core-ui-kit/hooks/user';
import { useAccount } from '@dhedge/core-ui-kit/hooks/web3';
import { TradingInput } from '@frontend/shared-ui';
import { Divider, Skeleton, Typography } from '@mui/material';

import type { FC } from 'react';

const useSendToken = () => {
  const [data, updater] = useSendTokenInput();
  // const price = useTokenPrice(data.address);
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

const useReceiveToken = () => {
  // const { address, chainId } = useTradingPanelPoolConfig();
  const [receiveToken] = useReceiveTokenInput();

  // const price = usePoolTokenPrice(address, chainId);

  return {
    ...receiveToken,
    // price,
  };
};

const useDepositInputsGroup = () => {
  const sendToken = useSendToken();
  const receiveToken = useReceiveToken();
  const { value, isLoading } = useExchangeRate();
  const poolConfig = useTradingPanelPoolConfig();
  useDepositQuote(poolConfig);
  // const log = useTradingPanelLogger();
  // const tradingPriceDiff = useTradingPriceDiff(
  //   sendToken.address,
  //   sendToken.value,
  //   receiveToken.value,
  // );

  const handleInputChange = (value: string) => {
    sendToken.updater({ value });
  };

  // const handleInputFocus = () => {
  //   log?.(TRADING_PANEL_LOG_EVENT.INVEST_INPUT_FOCUS, {
  //     symbol: sendToken.symbol,
  //     address: sendToken.address,
  //   });
  // };

  return {
    // autoFocus: !!account,
    sendToken,
    receiveToken,
    // tradingPriceDiff,
    // onInputFocus: handleInputFocus,
    onInputChange: handleInputChange,
    isExchangeRateLoading: isLoading,
    exchangeRate: value,
  };
};

export const DepositInputsGroup: FC = () => {
  const { account } = useAccount();
  const {
    sendToken,
    onInputChange,
    receiveToken,
    isExchangeRateLoading,
    exchangeRate,
  } = useDepositInputsGroup();
  return (
    <>
      <TradingInput
        token={sendToken}
        label="Buy with"
        onChange={onInputChange}
        maxBalance={sendToken.balance}
        isConnected={!!account}
        isLoading={sendToken.isLoading}
        autoFocus={!!account}
      />
      <Divider role="presentation" light={!account}>
        {isExchangeRateLoading ? (
          <Skeleton width={150} height={26} />
        ) : !exchangeRate ? null : (
          <Typography variant="value6">{exchangeRate}</Typography>
        )}
      </Divider>
      <TradingInput
        token={receiveToken}
        label="Buy (estimated)"
        isLoading={receiveToken.isLoading}
        hideBottomRow
        disabled
      />
    </>
  );
};
