import { Step, StepContent, StepLabel } from '@mui/material';

import { useOperationLabel } from '../../../hooks';
import { OperationRecapContent } from './OperationRecapContent';

import type { StepProps } from '@mui/material';

export const OperationStep = (props: StepProps) => {
  const operationLabel = useOperationLabel();

  return (
    <Step {...props}>
      <StepLabel>{operationLabel}</StepLabel>
      <StepContent>
        <OperationRecapContent />
      </StepContent>
    </Step>
  );
};
