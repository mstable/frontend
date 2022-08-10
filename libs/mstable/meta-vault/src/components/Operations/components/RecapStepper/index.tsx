import { useEffect, useState } from 'react';

import { Stack, Stepper } from '@mui/material';

import { useOperations } from '../../hooks';
import { ApproveStep } from './components/ApproveStep';
import { OperationRecapContent } from './components/OperationRecapContent';
import { OperationStep } from './components/OperationStep';

import type { StackProps } from '@mui/material';

export const RecapStepper = (props: StackProps) => {
  const { operation } = useOperations();
  const { needsApproval } = useOperations();
  const [activeStep, setActiveStep] = useState(needsApproval ? 0 : 1);

  useEffect(() => {
    setActiveStep(needsApproval ? 0 : 1);
  }, [needsApproval]);

  return (
    <Stack
      direction="column"
      borderRadius={1}
      p={2}
      {...props}
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        ...props?.sx,
      }}
    >
      {['deposit', 'mint'].includes(operation) ? (
        <Stepper activeStep={activeStep} orientation="vertical">
          {[<ApproveStep key="approve" />, <OperationStep key="operation" />]}
        </Stepper>
      ) : (
        <OperationRecapContent />
      )}
    </Stack>
  );
};
