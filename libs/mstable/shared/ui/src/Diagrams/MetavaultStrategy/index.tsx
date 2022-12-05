import { useEffect } from 'react';

import { Stack } from '@mui/material';

import { AnimatedDiagram } from './components/AnimatedDiagram';
import { Controls } from './components/Controls';
import { StepIndicator } from './components/StepIndicator';
import { StepLabel } from './components/StepLabel';
import { useSteps } from './hooks';
import { Provider } from './state';

export type DiagramStrategyProps = {
  onClose?: () => void;
};

const DiagramStrategyWrapped = ({ onClose }: DiagramStrategyProps) => {
  const { handleReset } = useSteps();

  useEffect(() => {
    handleReset();
  }, [handleReset]);

  return (
    <Stack direction="column" minHeight="60vh">
      <AnimatedDiagram flexGrow={1} pt={4} />
      <Stack direction="row" justifyContent="center" alignItems="center" my={1}>
        <StepIndicator />
      </Stack>
      <StepLabel minHeight={150} />
      <Controls onClose={onClose} py={4} />
    </Stack>
  );
};

export const DiagramStrategy = (props: DiagramStrategyProps) => (
  <Provider>
    <DiagramStrategyWrapped {...props} />
  </Provider>
);
