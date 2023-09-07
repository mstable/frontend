import { Stack } from '@mui/material';

import { useIsLeveragedType } from '../../../hooks/useIsLeveragedType';
import { LeveragedInputsGroup } from './LeveragedInputsGroup';
import { StableInputsGroup } from './StableInputsGroup';

import type { FC } from 'react';

export const TradingInputs: FC = () => {
  const isLeveraged = useIsLeveragedType();
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
      {isLeveraged ? <LeveragedInputsGroup /> : <StableInputsGroup />}
    </Stack>
  );
};
