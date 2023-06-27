import { Stack } from '@mui/material';
import { AnimatePresence } from 'framer-motion';

import { InputStep } from './components/InputStep';
import { StepIndicator } from './components/StepIndicator';
import { TotalBurned } from './components/TotalBurned';
import { WithdrawStep } from './components/WithdrawStep';
import { Provider, useTrackedState } from './state';

import type { StackProps, SxProps, Theme } from '@mui/material';

const cardSx: SxProps<Theme> = (theme) => ({
  padding: 4,
  borderRadius: 2,
  border: `1px solid ${theme.palette.divider}`,
});

const BurnFormWrapped = (props: StackProps) => {
  const { step } = useTrackedState();

  return (
    <Stack alignItems="center" spacing={1} {...props}>
      <TotalBurned />
      <StepIndicator />
      <AnimatePresence>
        {step === 0 ? (
          <InputStep
            sx={cardSx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        ) : (
          <WithdrawStep
            sx={cardSx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </Stack>
  );
};

export const BurnForm = (props: StackProps) => (
  <Provider>
    <BurnFormWrapped {...props} />
  </Provider>
);
