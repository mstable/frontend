import { Stack, useTheme } from '@mui/material';
import { Circle } from 'phosphor-react';
import { times } from 'ramda';

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
  const { step, maxLength } = useSteps();

  return (
    <Stack direction="row" spacing={1} {...rest}>
      {times(
        (n) => (
          <Circle
            key={`step-${n}`}
            width={dotSize}
            height={dotSize}
            weight="fill"
            color={
              n === step
                ? theme.palette.primary.main
                : theme.palette.text.secondary
            }
          />
        ),
        maxLength,
      )}
    </Stack>
  );
};
