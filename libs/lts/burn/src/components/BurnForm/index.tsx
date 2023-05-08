import { Stack } from '@mui/material';
import { AnimatePresence } from 'framer-motion';

import { useTrackedState } from '../../state';
import { InputStep } from './components/InputStep';
import { StepIndicator } from './components/StepIndicator';
import { WithdrawStep } from './components/WithdrawStep';

import type { StackProps, SxProps, Theme } from '@mui/material';

const cardSx: SxProps<Theme> = (theme) => ({
  padding: 4,
  borderRadius: 2,
  border: `1px solid ${theme.palette.divider}`,
});

export const BurnForm = (props: StackProps) => {
  const { step } = useTrackedState();

  return (
    <Stack alignItems="center" spacing={2} {...props}>
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
