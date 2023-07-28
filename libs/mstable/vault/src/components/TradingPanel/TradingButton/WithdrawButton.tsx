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
import { ApproveButton } from '@frontend/shared-ui';
import { Button } from '@mui/material';
import { useIntl } from 'react-intl';

import { TradeButton } from './TradeButton';

import type { FC } from 'react';

const useWithdrawButton = () => {
  const { address, chainId } = useTradingPanelPoolConfig();
  const [sendToken] = useSendTokenInput();

  const { cooldownActive, cooldownEndsInTime } = usePoolDynamicContractData({
    address,
    chainId,
  });
  const { approve, canSpend } = useWithdrawAllowance();
  const tradingParams = useTradingParams();
  const withdraw = useWithdraw(tradingParams);

  return {
    withdraw,
    approve,
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
    approve,
    sendToken,
    withdraw,
    cooldownActive,
    cooldownEndsInTime,
  } = useWithdrawButton();

  if (!canSpend) {
    return <ApproveButton onApprove={approve} symbol={sendToken.symbol} />;
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
    <TradeButton tradingHandler={withdraw} />
  );
};
