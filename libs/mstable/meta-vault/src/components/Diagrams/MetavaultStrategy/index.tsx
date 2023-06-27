import { useEffect } from 'react';

import { useIsMobile } from '@frontend/shared-hooks';
import { Stack } from '@mui/material';

import { AnimatedDiagram } from './components/AnimatedDiagram';
import { Controls } from './components/Controls';
import { MobileDiagram } from './components/MobileDiagram';
import { StepIndicator } from './components/StepIndicator';
import { StepLabel } from './components/StepLabel';
import { useSteps } from './hooks';
import { Provider } from './state';

export type DiagramStrategyProps = {
  onClose?: () => void;
};

const DiagramStrategyWrapped = ({ onClose }: DiagramStrategyProps) => {
  const isMobile = useIsMobile();
  const { handleReset } = useSteps();

  useEffect(() => {
    handleReset();
  }, [handleReset]);

  return (
    <Stack direction="column" minHeight="60vh" pt={isMobile ? 2 : 4} height={1}>
      {isMobile ? (
        <MobileDiagram minHeight={300} />
      ) : (
        <AnimatedDiagram minHeight={300} />
      )}
      <Stack direction="row" justifyContent="center" alignItems="center" my={3}>
        <StepIndicator />
      </Stack>
      <StepLabel flexGrow={1} />
      <Controls onClose={onClose} py={3} />
    </Stack>
  );
};

export const DiagramStrategy = (props: DiagramStrategyProps) => (
  <Provider>
    <DiagramStrategyWrapped {...props} />
  </Provider>
);
