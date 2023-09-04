import { useCallback } from 'react';

import { usePoolDynamicContractData } from '@dhedge/core-ui-kit/hooks/pool';
import {
  useSendTokenInput,
  useTradingPanelPoolConfig,
} from '@dhedge/core-ui-kit/hooks/state';
import { useTradingParams } from '@dhedge/core-ui-kit/hooks/trading';
import {
  useWithdraw,
  useWithdrawAllowance,
} from '@dhedge/core-ui-kit/hooks/trading/withdraw';
import { useLogAnalyticsEvent } from '@frontend/shared-providers';
import { ApproveButton } from '@frontend/shared-ui';
import { Button } from '@mui/material';
import { useIntl } from 'react-intl';

import { TradeButton } from './TradeButton';

import type { FC } from 'react';

const useWithdrawButton = () => {
  const logEvent = useLogAnalyticsEvent();
  const { address, chainId } = useTradingPanelPoolConfig();
  const [sendToken] = useSendTokenInput();

  const { cooldownActive, cooldownEndsInTime } = usePoolDynamicContractData({
    address,
    chainId,
  });
  const { approve, canSpend } = useWithdrawAllowance();
  const tradingParams = useTradingParams();
  const withdraw = useWithdraw(tradingParams);

  const handleApprove = useCallback(async () => {
    logEvent('approve_withdraw', { symbol: sendToken.symbol });
    return approve();
  }, [approve, logEvent, sendToken.symbol]);

  const handleWithdraw = useCallback(async () => {
    logEvent('withdraw', { symbol: sendToken.symbol });
    return withdraw();
  }, [withdraw, logEvent, sendToken.symbol]);

  return {
    handleWithdraw,
    handleApprove,
    canSpend,
    cooldownActive,
    cooldownEndsInTime,
    sendToken,
  };
};

export const WithdrawButton: FC = () => {
  const intl = useIntl();
  const {
    canSpend,
    handleApprove,
    sendToken,
    handleWithdraw,
    cooldownActive,
    cooldownEndsInTime,
  } = useWithdrawButton();

  if (!canSpend) {
    return (
      <ApproveButton onApprove={handleApprove} symbol={sendToken.symbol} />
    );
  }

  return cooldownActive ? (
    <Button disabled sx={{ lineHeight: 1.2 }}>
      {intl.formatMessage(
        {
          defaultMessage:
            'You can sell your {symbol} tokens in {cooldownEndsInTime}',
          id: '2Dq322',
        },
        { symbol: sendToken.symbol, cooldownEndsInTime },
      )}
    </Button>
  ) : (
    <TradeButton tradingHandler={handleWithdraw} />
  );
};
