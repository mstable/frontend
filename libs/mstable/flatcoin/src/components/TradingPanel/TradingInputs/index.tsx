import { Stack } from '@mui/material';

import { useFlatcoinPageState } from '../../../state';
import { DepositInputsGroup } from './DepositInputsGroup';
import { LeverageInput } from './LeverageInput';

import type { FC } from 'react';

export const useTradingInputs = () => {
  const isLeveraged = useFlatcoinPageState().type === 'leveraged';

  return { isLeveraged };
};

export const TradingInputs: FC = () => {
  const { isLeveraged } = useTradingInputs();
  return (
    <>
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
        <DepositInputsGroup />
      </Stack>
      {isLeveraged && <LeverageInput label="Leverage" px={2} />}
    </>
  );
};
