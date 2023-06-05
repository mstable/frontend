import { useHandleTrade } from '@dhedge/core-ui-kit/hooks/trading';
import { Button } from '@mui/material';

import type { ContractActionFunc } from '@dhedge/core-ui-kit/types';
import type { FC } from 'react';

export const TradeButton: FC<{ tradingHandler: ContractActionFunc }> = ({
  tradingHandler,
}) => {
  const { disabled, label, handleTrade } = useHandleTrade(tradingHandler);

  return (
    <Button disabled={disabled} onClick={handleTrade}>
      {label}
    </Button>
  );
};
