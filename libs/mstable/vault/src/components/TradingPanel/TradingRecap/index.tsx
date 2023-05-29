import {
  useIsDepositTradingPanelType,
  useReceiveTokenInput,
  useSendTokenInput,
} from '@dhedge/core-ui-kit/hooks/state';
import { Divider, Stack } from '@mui/material';

import { TradingTokensOverview } from './TradingTokensOverview';
import { TradingTransactionOverview } from './TradingTransactionOverview';

import type { FC } from 'react';

const useTradingRecap = () => {
  const [sendToken] = useSendTokenInput();
  const [receiveToken] = useReceiveTokenInput();
  const isDeposit = useIsDepositTradingPanelType();

  return {
    sendToken,
    receiveToken,
    isDeposit,
  };
};

export const TradingRecap: FC = () => {
  const { sendToken, receiveToken, isDeposit } = useTradingRecap();
  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{
        p: 2,
        borderRadius: 1,
        border: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <TradingTokensOverview sx={{ mb: 1 }} />
      <Divider role="presentation" />
      <TradingTransactionOverview />
    </Stack>
  );
};
