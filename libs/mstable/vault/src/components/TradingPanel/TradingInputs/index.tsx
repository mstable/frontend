import { useIsDepositTradingPanelType } from '@dhedge/core-ui-kit/hooks/state';
import { Stack } from '@mui/material';

import { DepositInputsGroup } from './DepositInputsGroup';

import type { FC } from 'react';

export const TradingInputs: FC = () => {
  const isDeposit = useIsDepositTradingPanelType();
  return (
    <Stack
      borderRadius={1}
      p={2}
      direction="column"
      spacing={3}
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: 'transparent',
      }}
    >
      {isDeposit ? <DepositInputsGroup /> : 'Sell Inputs'}
    </Stack>
  );
};
