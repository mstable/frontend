import { Stack, useTheme } from '@mui/material';
import { Circle } from 'phosphor-react';

import { useSteps } from '../hooks';

import type { StackProps } from '@mui/material';

export type StepIndicatorProps = {
  dotSize?: number;
} & StackProps;

export const StepIndicator = ({
  dotSize = 10,
  ...rest
}: StepIndicatorProps) => {
  const theme = useTheme();
  const { steps, activeStep } = useSteps();

  return (
    <Stack direction="row" spacing={1} {...rest}>
      {steps.map((step) => (
        <Circle
          key={`step-${step}`}
          width={dotSize}
          height={dotSize}
          weight="fill"
          color={
            step === activeStep
              ? theme.palette.primary.main
              : theme.palette.text.secondary
          }
        />
      ))}
    </Stack>
  );
};
