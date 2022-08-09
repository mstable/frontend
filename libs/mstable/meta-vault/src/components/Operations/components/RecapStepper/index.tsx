import { useEffect, useState } from 'react';

import { Stack, Stepper } from '@mui/material';

import { useOperations } from '../../hooks';
import { ApproveStep } from './components/ApproveStep';
import { OperationStep } from './components/OperationStep';

import type { StackProps } from '@mui/material';

export const RecapStepper = (props: StackProps) => {
  const { needsApproval } = useOperations();
  const [activeStep, setActiveStep] = useState(needsApproval ? 0 : 1);

  useEffect(() => {
    setActiveStep(needsApproval ? 0 : 1);
  }, [needsApproval]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Stack direction="column" {...props}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {[
          <ApproveStep key="approve" handleNext={handleNext} />,
          <OperationStep key="operation" />,
        ]}
      </Stepper>
    </Stack>
  );
};
